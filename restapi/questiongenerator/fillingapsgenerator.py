import random
import gensim.downloader as api

class FillInGapsGenerator():
    """
    This is a class that generates fill in the gaps questions based on keywords selected from a given text. 
    """
    def __init__(self):
        self.model = api.load('glove-twitter-25')
        self.system_random = random.SystemRandom()

    def generate_questions(self, text, keywords_selected):
        res = []
        for keyword in keywords_selected:
            print("value: " + keyword.value)
            question_text = self.get_question_text(text, keyword.value, res)
            options = self.get_options(keyword.value)
            if (question_text != ""):
                res.append({
                    'question': question_text.replace("\n", " "),
                    'options': options
                })
        return res

    def get_question_text(self, text, word, actual_list):
        for sentence in text.split("."):
            if (len(actual_list) == 0):
                if (word.lower() in sentence.lower()):
                    return self.create_fillin_sentence(sentence, word)
            elif (len(actual_list) != 0):
                if (word.lower() in sentence.lower() and sentence not in map(lambda q: q['question'], actual_list)):
                    return self.create_fillin_sentence(sentence, word)
        return ""

    def create_fillin_sentence(self, sentence, word):
        start = sentence.lower().find(" " + word + "")
        end = len(word)
        sentence = sentence[:start+1] + " _________ " + sentence[start+1+end:]
        return sentence

    def get_options(self, word):
        res = []
        while (len(res) < 3):
            random_word = self.get_related_word(word)
            if (random_word not in res):
                res.append(random_word)
        index = self.system_random.randint(0, 3)
        res.insert(index, {'value': word, 'correct': True})

        return res
    
    def get_related_word(self, word):

        splitted_word = word.split(" ")
        if (len(splitted_word) > 1):
            word = splitted_word[len(splitted_word)-1]

        similar_words = self.model.most_similar(word)

        index = self.system_random.randint(0, 5)
        return {'value': similar_words[index][0], 'correct': False}
