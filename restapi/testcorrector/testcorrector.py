
class TestCorrector:

    def correct(self, test_found, test_check):
        res = {"correction": [], "score": 0, "max_score": 0, "base10_score": 0}
        for i in range(len(test_found["questions"])):
            index_of_correct = test_found["questions"][i]["options"].index(list(filter(lambda x: x["is_correct"] == True, test_found["questions"][i]["options"]))[0])
            number_of_options = len(test_found["questions"][i]["options"])
            if test_check.selection[i] != -1:
                if test_found["questions"][i]["options"][test_check.selection[i]]["is_correct"] == True:
                    res["score"] += 1
                    res["correction"].append({'is_correct': True, 'addedScore':1, 'correctOption': index_of_correct})
                else:
                    res["score"] -= 1/number_of_options
                    res["correction"].append({'is_correct':False, 'addedScore':-1/number_of_options, 'correctOption': index_of_correct})
                    
            else:
                res["correction"].append({'is_correct': None, 'addedScore': 0, 'correctOption': index_of_correct})
            res["max_score"] += 1
        if(res["score"] <= 0):
            res["base10_score"] = 0
            res["score"] = 0
        else:
            res["base10_score"] = round(res["score"]*10/res["max_score"],2)
        return res