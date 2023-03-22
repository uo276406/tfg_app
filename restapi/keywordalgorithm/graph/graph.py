import numpy as np
import math


class Graph:

    def __init__(self, vocabulary, processed_text, window_size=3):
        self.vocabulary = vocabulary
        self.processed_text = processed_text
        self.weighted_edge = None
        self.score = None
        self.covered_coocurrences = None
        self.window_size = window_size

    def create_graph(self):
        vocab_len = len(self.vocabulary)
        self.weighted_edge = np.zeros((vocab_len, vocab_len), dtype='f')

        self.score = np.zeros(vocab_len, dtype='f')
        self.covered_coocurrences = []

        for i in range(0, vocab_len):
            self.score[i] = 1
            for j in range(0, vocab_len):
                # Self connections are not considered
                if j == i:
                    self.weighted_edge[i][j] = 0
                else:
                    for window_start in range(0, (len(self.processed_text) - self.window_size)):
                        window_end = window_start + self.window_size
                        window = self.processed_text[window_start:window_end]

                        if (self.vocabulary[i] in window) and (self.vocabulary[j] in window):
                            index_of_i = window_start + window.index(self.vocabulary[i])
                            index_of_j = window_start + window.index(self.vocabulary[j])

                            # index_of_x is the absolute position of the xth term in the window
                            # (counting from 0)
                            # in the processed_text

                            if [index_of_i, index_of_j] not in self.covered_coocurrences:
                                self.weighted_edge[i][j] += 1 / math.fabs(index_of_i - index_of_j)
                                self.weighted_edge[j][i] += 1 / math.fabs(index_of_i - index_of_j)
                                self.covered_coocurrences.append([index_of_i, index_of_j])