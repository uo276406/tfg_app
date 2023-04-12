import regex as re

class FillInGapsGenerator():
    """
    This is a class that generates fill in the gaps questions based on keywords selected from a given text. 
    """

    def generate_questions(self, text, keywords_selected):
        res = []
        for keyword in keywords_selected:
            print(keyword.value)
            question_text = self.get_question_text(text, keyword.value, res)
            options = self.get_options(text, keyword.value)
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

    def get_options(self, text, word):
        return [
            {'value': 'a', 'correct': False},
            {'value': 'b', 'correct': False},
            {'value': 'c', 'correct': True},
            {'value': 'd', 'correct': False}
        ]
