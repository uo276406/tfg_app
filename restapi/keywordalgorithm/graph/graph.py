import numpy as np
import math


class Graph:

    def __init__(self, vocabulary, processed_text, window_size=3):
        """
        Initialize an instance of the TextRank algorithm.
        @param vocabulary - the vocabulary of the text
        @param processed_text - the text that has been preprocessed
        @param window_size - the size of the window to use for co-occurrence
        @return None
        """
        self.vocabulary = vocabulary
        self.processed_text = processed_text
        self.weighted_edge = None
        self.score = None
        self.covered_coocurrences = None
        self.window_size = window_size

    def create_graph(self):
        """
        Create a graph based on the vocabulary. The graph is represented as a matrix of weighted edges. 
        The score is initialized to 1 for each word in the vocabulary. 
        For each word pair, calculate the weight of the edge between them. 
        @param self - the object instance
        @return None
        """
        vocab_len = len(self.vocabulary)
        self.weighted_edge = np.zeros((vocab_len, vocab_len), dtype='f')

        self.score = np.zeros(vocab_len, dtype='f')
        self.covered_coocurrences = []

        for i in range(0, vocab_len):
            self.score[i] = 1
            for j in range(0, vocab_len):
                self.calculate_weight(i, j)

    def calculate_weight(self, i, j):
        """
        This method calculates the weight of the edge between two nodes in a graph. The graph is constructed from a text corpus, where each node represents a word in the vocabulary. The weight of the edge between two nodes is determined by the number of times the two words co-occur within a sliding window of a fixed size. The weight is inversely proportional to the distance between the two occurrences of the words within the window.
        """
        # Self connections are not considered
        if j == i:
            self.weighted_edge[i][j] = 0
        else:
            for window_start in range(0, (len(self.processed_text) - self.window_size)):
                window_end = window_start + self.window_size
                window = self.processed_text[window_start:window_end]

                if (self.vocabulary[i] in window) and (self.vocabulary[j] in window):
                    index_of_i = window_start + \
                        window.index(self.vocabulary[i])
                    index_of_j = window_start + \
                        window.index(self.vocabulary[j])

                    # index_of_x is the absolute position of the xth term in the window
                    # (counting from 0)
                    # in the processed_text

                    if [index_of_i, index_of_j] not in self.covered_coocurrences:
                        self.weighted_edge[i][j] += 1 / \
                            math.fabs(index_of_i - index_of_j)
                        self.weighted_edge[j][i] += 1 / \
                            math.fabs(index_of_i - index_of_j)
                        self.covered_coocurrences.append(
                            [index_of_i, index_of_j])
