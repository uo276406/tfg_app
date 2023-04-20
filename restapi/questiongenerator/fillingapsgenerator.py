import random
import gensim.downloader as api
import nltk
import re


class FillInGapsGenerator():
    """
    This is a class that generates fill in the gaps questions based on keywords selected from a given text. 
    """

    def __init__(self):
        """
        Initialize an instance of the class with a pre-trained GloVe model and a system random number generator.
        @returns None.
        """
        self.model = api.load('glove-wiki-gigaword-50')
        self.system_random = random.SystemRandom()

    def generate_questions(self, text, keywords_selected):
        """
        Given some text and a list of selected keywords, generate a list of questions and options for each keyword.
        @param self - the class instance
        @param text - the text to generate questions from
        @param keywords_selected - the list of selected keywords
        @return a list of dictionaries containing the generated questions and options
        """
        sentences_used = []
        res = {'questions': [], 'there_are_repeated': False}
        for keyword in keywords_selected:
            print("value: " + keyword.value)
            question_text, sentence_used, repeated = self.get_question_text(text, keyword.value, sentences_used) # Obtiene la pregunta
            options = self.get_options(keyword.value)
            sentences_used.append(sentence_used) # Guarda la oración de la pregunta
            if (repeated):
                res['there_are_repeated'] = True
            res['questions'].append({
                'question': question_text.replace("\n", " "),
                'options': options
            })
        return res

    def get_question_text(self, text, word, sentences_used):
        """
        Given a text, a word, and a list of actual questions, return a fill-in-the-blank sentence containing the word if the word is in the text and not already in the list of actual questions. If the word is not in the text or is already in the list of actual questions, return an empty string.
        @param self - the object instance
        @param text - the text to search for the word
        @param word - the word to search for in the text
        @param actual_list - the list of actual questions
        @return a fill-in-the-blank sentence containing the word if the word is in the text and not already in the list of actual questions. If the word is not in the text or is already in the list of actual questions
        """
        sentences = text.split(".")
        for sentence in sentences:
            if (re.search(r'\b' + word.lower() + r'\b', sentence.lower()) is not None and sentence not in sentences_used):
                return self.create_fillin_sentence(sentence, word), sentence, False
        
        #Si llega aquí es porque hay alguna pregunta que se va a repetir (Se coge una aleatoria)
        rand_sentence = self.system_random.randint(0, len(sentences)-1)
        print(word)
        print(sentences[rand_sentence])
        while (re.search(r'\b' + word.lower() + r'\b', sentences[rand_sentence].lower()) is None):
            rand_sentence = self.system_random.randint(0, len(sentences)-1)

        return self.create_fillin_sentence(sentences[rand_sentence], word), sentences[rand_sentence], True


    def create_fillin_sentence(self, sentence, word):
        """
        Given a sentence and a word, create a fill-in-the-blank sentence with the word in the blank.
        @param self - the class instance
        @param sentence - the original sentence
        @param word - the word to be blanked out
        @return The sentence with the blank
        """

        start = sentence.lower().find(" " + word + "")
        end = len(word)
        sentence = sentence[:start+1] + " _________ " + sentence[start+1+end:]
        return sentence

    def get_options(self, word):
        """
        Given a word, return a list of 3 related words and the original word in a random position.
        @param self - the class instance
        @param word - the word to find related words for
        @return a list of 4 words, with the original word in a random position.
        """
        res = []
        while (len(res) < 3):
            random_word = self.get_related_word(word)
            if (random_word not in res):
                res.append(random_word)
        index = self.system_random.randint(0, 3)
        res.insert(index, {'value': word, 'correct': True})
        return res

    def get_related_word(self, word):
        """
        Given a word, find the most similar word to it using a pre-trained word2vec model.
        If the input word is a phrase, only use the last word of the phrase.
        @param self - the class instance
        @param word - the input word or phrase
        @return a dictionary containing the most similar word and a boolean indicating if it is correct.
        """
        splitted_word = word.split(" ")
        if (len(splitted_word) > 1):
            word = splitted_word[len(splitted_word)-1]
        
        posttagged_word = nltk.pos_tag([word])
        gramatical_tag = posttagged_word[0][1]
        similar_words = self.model.most_similar(positive=[word], topn=15)

        index = self.system_random.randint(0, len(similar_words)-1)
        
        while (gramatical_tag != nltk.pos_tag([similar_words[index][0]])[0][1]):
            index = self.system_random.randint(0, len(similar_words)-1)

        return {'value': similar_words[index][0], 'correct': False}
