import nltk
from nltk import word_tokenize
from nltk.stem import WordNetLemmatizer

import string

from spacy.lang.en.stop_words import STOP_WORDS


class TextProcessor:
    """Extract keywords from text"""

    def __init__(self, text):
        self.pos_tag = None
        self.filtered_text = None
        self.vocabulary = None
        self.tokenized_text = None
        self.cleaned_text = None
        self.lemmatized_text = None
        self.stopwords = []
        self.text = text

    def clean(self, raw_text):
        raw_text = raw_text.lower()
        printable = set(string.printable)
        raw_text = filter(lambda x: x in printable, raw_text)
        cleaned_text = "".join(list(raw_text))
        self.cleaned_text = cleaned_text

    def tokenize_text(self, cleaned_text):
        self.tokenized_text = word_tokenize(cleaned_text)

    def pos_tag_text(self, tokenized_text):
        self.pos_tag = nltk.pos_tag(tokenized_text)

    def lemmatize_text(self):
        wordnet_lemmatizer = WordNetLemmatizer()
        adjective_tags = ['JJ', 'JJR', 'JJS']
        lemmatized_text = []
        for word in self.pos_tag:
            if word[1] in adjective_tags:
                # "a" tels the function that it has to lemmatize an adjective
                lemmatized_text.append(
                    str(wordnet_lemmatizer.lemmatize(word[0], pos="a")))
            else:
                # default POS = noun
                lemmatized_text.append(
                    str(wordnet_lemmatizer.lemmatize(word[0])))
        self.lemmatized_text = lemmatized_text

    def set_stopwords(self):
        # wanted_pos = ['NN', 'NNS', 'NNP', 'NNPS', 'JJ', 'JJR', 'JJS'] # Sustantivos y adjetivos
        wanted_pos = ['NN', 'NNS', 'NNP', 'NNPS']  # Sustantivos
        for word in self.pos_tag:
            if word[1] not in wanted_pos:
                self.stopwords.append(word[0])
        punctuations = list(str(string.punctuation))
        self.stopwords = self.stopwords + punctuations

    def filter_words(self, lemmatized_text):
        filtered_text = []
        for word in lemmatized_text:
            if word not in STOP_WORDS and word not in self.stopwords:
                filtered_text.append(word)
        self.filtered_text = filtered_text

    def set_vocabulary(self, filtered_text):
        self.vocabulary = list(set(filtered_text))

    def process_text(self):
        # The raw input text is cleaned off non-printable characters (if any) and turned into lower case.
        self.clean(self.text)

        # The processed input text is then tokenized using NLTK library functions.
        self.tokenize_text(self.cleaned_text)

        # NLTK is again used for POS tagging the input text so that the words can be lemmatized based on their POS tags.
        # http://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html
        self.pos_tag_text(self.tokenized_text)

        # The tokenized text (mainly the nouns and adjectives) is normalized by lemmatization.
        # In lemmatization different grammatical counterparts of a word will be replaced by single basic lemma.
        # For example, 'glasses' may be replaced by 'glass'.
        self.lemmatize_text()
        self.pos_tag_text(self.lemmatized_text)

        # Makes a list of stopwords
        self.set_stopwords()

        # Remove stopwords and punctuation strings using a list from spacy
        self.filter_words(self.lemmatized_text)

        # Gets the vocabulary of the text, deletes repeated words
        self.set_vocabulary(self.filtered_text)
