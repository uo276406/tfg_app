from keywordalgorithm.processor.textprocessor import TextProcessor
from keywordalgorithm.graph.graph import Graph
from keywordalgorithm.scorer.keywordscorer import Scorer


class KeywordExtractor:
    """Extract keywords from text"""

    def extract_keywords(self, text):
        # Process the text
        processor = TextProcessor(text)
        processor.process_text()

        # nltk.download('averaged_perceptron_tagger')
        # nltk.download('wordnet')

        graph = Graph(processor.vocabulary, processor.filtered_text)
        graph.create_graph()

        # Looks for the keywords
        scorer = Scorer(processor=processor, graph=graph, damping_factor=0.85,
                        convergence_threshold=1e-3, iteration_steps=15)

        keywords_found = scorer.get_keywords()
        res = []
        i = 0
        for k in keywords_found:
            res.append({'index': i, 'value': k})
            i += 1
        return {'keywords': res}
