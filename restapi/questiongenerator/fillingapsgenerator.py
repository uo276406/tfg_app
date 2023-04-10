class FillInGapsGenerator():
    def generate_questions(self, text, keywords_selected):
        return [
        {
            'question': 'blablabla1',
            'options': [
                {'value': 'a', 'correct': False},
                {'value': 'b', 'correct': False},
                {'value': 'c', 'correct': True},
                {'value': 'd', 'correct': False}
            ]
        },
        {
            'question': 'blablabla2',
            'options': [
                {'value': 'a', 'correct': False},
                {'value': 'b', 'correct': False},
                {'value': 'c', 'correct': True},
                {'value': 'd', 'correct': False}
            ]
        },
        {
            'question': 'blablabla3',
            'options': [
                {'value': 'a', 'correct': False},
                {'value': 'b', 'correct': False},
                {'value': 'c', 'correct': True},
                {'value': 'd', 'correct': False}
            ]
        }
    ]