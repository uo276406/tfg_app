class FillInGapsGenerator():
    """
    This is a class that generates fill in the gaps questions based on keywords selected from a given text. 
    """
    def generate_questions(self, text, keywords_selected):
        res = []
        for keyword in keywords_selected:
            question_text = self.get_question_text(text, keyword.value, res)
            options = self.get_options(text, keyword.value)
            res.append({
                'question': question_text,
                'options': options
            })
        return res


    def get_question_text(self, text, word, actual_list):
            for sentence in text.split("."):
                 if(word.lower() in sentence.lower() and sentence not in map(lambda q: q.question, actual_list)):
                      return sentence
            

    def get_options(self, text, word):
        return [
            {'value': 'a', 'correct': False},
            {'value': 'b', 'correct': False},
            {'value': 'c', 'correct': True},
            {'value': 'd', 'correct': False}
        ]
