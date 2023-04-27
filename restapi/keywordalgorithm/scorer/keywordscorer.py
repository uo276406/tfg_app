import numpy as np

from spacy.lang.en.stop_words import STOP_WORDS


class Scorer:
    """
    This is a class that scores keyphrases in a text using the PageRank algorithm. 
    """

    def __init__(self, damping_factor=0.85, convergence_threshold=1e-5, iteration_steps=50, score_threshold=0, processor=None, graph=None):
        """
        This is the constructor for the algorithm class. It initializes the class with various parameters.
        @param damping_factor - The damping factor for the the algorithm. Default is 0.85.
        @param convergence_threshold - The threshold for convergence of the algorithm. Default is 1e-5.
        @param iteration_steps - The number of iterations for the algorithm. Default is 50.
        @param score_threshold - The threshold for the score of a node to be included in the final results. Default is 0.
        @param processor - The processor to use for the algorithm. Default is None.
        @param graph - The graph to use for the algorithm. Default is None.
        """
        self.damping_factor = damping_factor  # normalmente  .85
        self.threshold = convergence_threshold
        self.iterations = iteration_steps
        self.processor = processor
        self.score_threshold = score_threshold
        self.graph = graph


    def score_vocabulary_words(self):
        """
        This method calculates the score of vocabulary words using the PageRank algorithm.
        It first initializes an array of zeros with the length of the vocabulary. It then calculates the sum of the weighted edges for each word in the vocabulary. 
        """
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
                        summation += (self.graph.weighted_edge[i]
                                      [j] / inout[j]) * self.graph.score[j]
                self.graph.score[i] = (
                    1 - self.damping_factor) + self.damping_factor * summation

            if np.sum(np.fabs(prev_score - self.graph.score)) <= self.threshold:  # convergence condition
                print("Converging at iteration " + str(iteration) + "...")
                break


    def get_candidate_keyphrases(self):
        """
        This method extracts candidate keyphrases from a given text. It first tokenizes the text and removes stopwords. It then creates candidate phrases by combining non-stopword tokens. It then removes duplicate phrases and single-word phrases that are also present in multi-word phrases. Finally, it returns the unique candidate phrases.
        @return A list of unique candidate keyphrases.
        """
        candidate_phrases = []
        candidate_phrase = " "
        for word in self.processor.lemmatized_text:
            if word in self.processor.stopwords or word in STOP_WORDS:
                if candidate_phrase != " " and candidate_phrase in self.processor.cleaned_text:
                    candidate_phrases.append(
                        str(candidate_phrase).strip().split())
                candidate_phrase = " "
            elif word not in self.processor.stopwords and word not in STOP_WORDS:
                candidate_phrase += str(word)
                candidate_phrase += " "

        return self.get_unique_phrases(candidate_phrases)

    def get_unique_phrases(self, candidate_phrases):
        """
        Given a list of candidate phrases, return a list of unique phrases.
        @param self - the class instance
        @param candidate_phrases - the list of candidate phrases
        @return A list of unique phrases.
        """
        unique_phrases = []
        # Elimina los duplicados
        for phrase in candidate_phrases:
            if phrase not in unique_phrases:
                unique_phrases.append(phrase)

        for word in self.processor.vocabulary:
            for phrase in unique_phrases:
                if (word in phrase) and ([word] in unique_phrases) and (len(phrase) > 1):
                    unique_phrases.remove([word])
        return unique_phrases


    def score_keyphrases(self, phrases):
        phrase_scores = []
        """
        Given a list of phrases, score each phrase based on the sum of the scores of its words.
        If the score of a phrase is below a certain threshold, remove it from the list of keywords.
        @param self - the object instance
        @param phrases - a list of phrases
        @return a tuple containing two lists: the keywords and their corresponding scores.
        """
        keywords = []
        for phrase in phrases:
            phrase_score = 0
            keyword = ''
            for word in phrase:
                keyword += str(word)
                keyword += " "
                if word in self.processor.vocabulary:
                    phrase_score += self.graph.score[self.processor.vocabulary.index(
                        word)]

            phrase_scores.append(phrase_score)
            keywords.append(keyword.strip())

        for i in range(len(keywords)):
            # Retorna palabars clave a partir de un límite de puntuación
            if phrase_scores[i] < self.score_threshold:
                keywords.pop(i)

        return keywords, phrase_scores


    def get_keywords(self):
        """
        This method is part of a class. It returns a list of keywords that are extracted from a text document. 
        """
        # Calcula la puntuación de cada palabra
        self.score_vocabulary_words()

        # Obtiene las frases candidatas
        phrases = self.get_candidate_keyphrases()

        # Puntuación de las frases candidatas
        keywords, phrase_scores = self.score_keyphrases(phrases)

        # Ordena las frases por puntuación
        sorted_index = np.flip(np.argsort(phrase_scores), 0)
        res = []
        for i in range(0, len(keywords)):
            res.append(str(keywords[sorted_index[i]]))

        return res
