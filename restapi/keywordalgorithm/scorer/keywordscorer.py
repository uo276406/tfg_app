import numpy as np

from spacy.lang.en.stop_words import STOP_WORDS


class Scorer:
    """Extract keywords from text"""
    def __init__(self, damping_factor=0.85, convergence_threshold=1e-5, iteration_steps=50, score_threshold=0, processor=None, graph=None):
        self.damping_factor = damping_factor  # usually  .85
        self.threshold = convergence_threshold
        self.iterations = iteration_steps
        self.processor = processor
        self.score_threshold = score_threshold
        self.graph = graph

    """Gives a score for every word which has been found in the vocabulary"""
    def score_vocabulary_words(self):
        vocab_len = len(self.processor.vocabulary)

        # Gets the sum of weights of every vertex
        inout = np.zeros(vocab_len, dtype='f')
        for i in range(0, vocab_len):
            for j in range(0, vocab_len):
                inout[i] += self.graph.weighted_edge[i][j]

        for iteration in range(0, self.iterations):
            prev_score = np.copy(self.graph.score)
            for i in range(0, vocab_len):
                summation = 0

                for j in range(0, vocab_len):
                    if self.graph.weighted_edge[i][j] != 0:
                        summation += (self.graph.weighted_edge[i][j] / inout[j]) * self.graph.score[j]
                self.graph.score[i] = (1 - self.damping_factor) + self.damping_factor * summation

            if np.sum(np.fabs(prev_score - self.graph.score)) <= self.threshold:  # convergence condition
                print("Converging at iteration " + str(iteration) + "...")
                break

    """Gets keyphrases susceptible of being keywords"""
    def get_candidate_keyphrases(self):
        candidate_phrases = []
        candidate_phrase = " "
        for word in self.processor.lemmatized_text:
            if word in self.processor.stopwords or word in STOP_WORDS:
                if candidate_phrase != " " and candidate_phrase in self.processor.cleaned_text:
                    candidate_phrases.append(str(candidate_phrase).strip().split())
                candidate_phrase = " "
            elif word not in self.processor.stopwords and word not in STOP_WORDS:
                candidate_phrase += str(word)
                candidate_phrase += " "

        unique_phrases = []
        # Deletes repeated ones
        for phrase in candidate_phrases:
            if phrase not in unique_phrases:
                unique_phrases.append(phrase)

        for word in self.processor.vocabulary:
            for phrase in unique_phrases:
                if (word in phrase) and ([word] in unique_phrases) and (len(phrase) > 1):
                    # if len(phrase)>1 then the current phrase is multi-worded.
                    # if the word in vocabulary is present in unique_phrases as a single-word-phrase
                    # and at the same time present as a word within a multi-worded phrase,
                    # then I will remove the single-word-phrase from the list.
                    unique_phrases.remove([word])

        return unique_phrases

    """Score the keyphrases selected"""
    def score_keyphrases(self, phrases):
        phrase_scores = []
        keywords = []
        for phrase in phrases:
            phrase_score = 0
            keyword = ''
            for word in phrase:
                keyword += str(word)
                keyword += " "
                if word in self.processor.vocabulary:
                    phrase_score += self.graph.score[self.processor.vocabulary.index(word)]

            phrase_scores.append(phrase_score)
            keywords.append(keyword.strip())

        for i in range(len(keywords)):
            if phrase_scores[i] < self.score_threshold:  # Only return keywords with score 0.2 or more
                keywords.pop(i)

        return keywords, phrase_scores

    """Returns the keywords of the text"""
    def get_keywords(self):
        # calculates the punctuation
        self.score_vocabulary_words()

        # gets candidate phrases
        phrases = self.get_candidate_keyphrases()

        # scores all the phrases
        keywords, phrase_scores = self.score_keyphrases(phrases)

        # Get ranked keywords
        """
        sorted_index = np.flip(np.argsort(phrase_scores), 0)
        keywords_num = 100
        print("Keywords found:\n")
        for i in range(0, keywords_num):
            print(str(keywords[sorted_index[i]]))
        """
        return keywords



