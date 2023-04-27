import nltk
from nltk import word_tokenize
from nltk.stem import WordNetLemmatizer

import string

from spacy.lang.en.stop_words import STOP_WORDS


class TextProcessor:
    """
    This is a class that processes text by cleaning, tokenizing, part-of-speech tagging, lemmatizing, setting stopwords, filtering words, and setting the vocabulary. 
    """

    def __init__(self, text):
        """
        This is a class constructor that initializes various attributes of the class.
        @param text - the text to be processed
        @returns None
        """
        self.pos_tag = None
        self.filtered_text = None
        self.vocabulary = None
        self.tokenized_text = None
        self.cleaned_text = None
        self.lemmatized_text = None
        self.stopwords = []
        self.text = text

    def clean(self, raw_text):
        """
        This is a method of a class that cleans raw text by removing non-printable characters and converting all characters to lowercase.
        @param self - the instance of the class
        @param raw_text - the text to be cleaned
        @return None. The cleaned text is stored in the instance variable `cleaned_text`.
        """
        raw_text = raw_text.lower()
        printable = set(string.printable)
        raw_text = filter(lambda x: x in printable, raw_text)
        cleaned_text = "".join(list(raw_text))
        self.cleaned_text = cleaned_text

    def tokenize_text(self, cleaned_text):
        """
        Tokenize the given text using the `word_tokenize` function from the `nltk` library.
        @param self - the class instance
        @param cleaned_text - the text to be tokenized
        @return None
        """
        self.tokenized_text = word_tokenize(cleaned_text)

    def pos_tag_text(self, tokenized_text):
        """
        Given a tokenized text, perform part-of-speech tagging on the text using the Natural Language Toolkit (nltk) library.
        @param self - the class instance
        @param tokenized_text - the tokenized text to be tagged
        @return None
        """
        self.pos_tag = nltk.pos_tag(tokenized_text)

    def lemmatize_text(self):
        """
        This function lemmatizes text by using the WordNetLemmatizer from the nltk library.
        It takes in a list of words that have already been POS tagged and lemmatizes each word
        according to its POS tag. Adjectives are lemmatized with the 'a' parameter to indicate
        that they are adjectives. The lemmatized text is stored in the object's lemmatized_text attribute.
        @param self - the object calling the function
        @return None
        """
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
        """
        This function sets the stopwords for a natural language processing task. It first filters out words that are not of the desired part of speech (NN, NNS, NNP, NNPS) and adds them to the list of stopwords. It then adds punctuation marks to the list of stopwords.
        @return None
        """
        # wanted_pos = ['NN', 'NNS', 'NNP', 'NNPS', 'JJ', 'JJR', 'JJS'] # Sustantivos y adjetivos
        wanted_pos = ['NN', 'NNS', 'NNP', 'NNPS']  # Sustantivos
        for word in self.pos_tag:
            if word[1] not in wanted_pos:
                self.stopwords.append(word[0])
        punctuations = list(str(string.punctuation))
        self.stopwords = self.stopwords + punctuations

    def filter_words(self, lemmatized_text):
        """
        Given a list of lemmatized words, filter out any stop words or user-defined stopwords.
        @param self - the object instance
        @param lemmatized_text - the list of lemmatized words
        @return None. The filtered text is stored in the object instance.
        """
        filtered_text = []
        for word in lemmatized_text:
            if word not in STOP_WORDS and word not in self.stopwords:
                filtered_text.append(word)
        self.filtered_text = filtered_text

    def set_vocabulary(self, filtered_text):
        """
        Given a list of filtered text, set the vocabulary of the class to be the unique set of words in the text.
        @param self - the class instance
        @param filtered_text - the filtered text to set the vocabulary to.
        """
        self.vocabulary = list(set(filtered_text))

    def process_text(self):
        """
        This method processes text by cleaning, tokenizing, part-of-speech tagging, lemmatizing, setting stopwords, filtering words, and setting the vocabulary.
        @return None
        """
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
