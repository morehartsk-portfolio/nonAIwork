import re
#from urllib.request import urlopen
print("Spelling Bee Solver")
print("Not affiliated with NYT Spelling Bee")
#was going to do some web scraping but unfortunately I am unable to use urllib with a browser and installing python is not an option at this time. I will be using a text file instead.
#data = urlopen("http://olympus.realpython.org/profiles/aphrodite")
#html_bytes = data.read()
#html = html_bytes.decode("utf-8")
data = open("words_alpha.txt")
#filter out all short words beforehand
lexicon = []
for x in data:
    if len(x) >= 5:
        lexicon.append(x[:-1])

def mainOptions():
    print("1. Enter a 7-letter string\n2. Review rules\n3. Quit")
    playerChoice = input("Please enter a number from 1 to 3: ")
    if re.findall("[^123]", playerChoice):
        print("Invalid option.")
        return True
    else:
	    if int(playerChoice) == 3:
	        return False
	    elif int(playerChoice) == 2:
	        reviewRules()
	    elif int(playerChoice) == 1:
	        findAllWords()
	    return True

def reviewRules():
    print("You are given a 7 unique letters, one of which is highlighted.\nYour goal is to create as many words as possible only using those 7 letters.\nWords must be at least 4 letters long and contain the highlighted letter.\nProper nouns, hyphenated words, and acronyms are not allowed.\nYou may use the same letter multiple times in a single word.")

def findAllWords():
    validString = False
    while not validString:
        #https://www.reddit.com/r/learnpython/comments/r15arc/use_regex_to_check_if_string_contains_only/ reference
        #https://stackoverflow.com/questions/32090058/testing-whether-a-string-has-repeated-characters
        playerString = input("Please enter a string of 7 letters, only capitalizing the highlighted character: ")
        if re.fullmatch("[a-zA-Z]{7}", playerString) and len(re.findall("[A-Z]{1}", playerString)) == 1 and len(set(playerString.lower())) == len(playerString):
            validString = True
            wordFinder(playerString)
        else:
            print("Invalid string, please try again.")
            validString = False
def wordFinder(toLook):
    #https://www.geeksforgeeks.org/python/python-regex/
    #https://www.geeksforgeeks.org/python/re-compile-in-python/
    #more references
    mustHave = re.findall("[A-Z]{1}", toLook)[0]
    otherChars = toLook.replace(mustHave,"")
    regRaw = "^[" + otherChars + "]*" + "[" + mustHave.lower() + "]+" + "[" + otherChars + "]*$"
    pattern = re.compile(regRaw)
    results = []
    for lex in lexicon:
        if pattern.match(lex):
            results.append(lex)
    print(results)

def mainLoop():
    stillPlaying = True
    while stillPlaying:
        stillPlaying = mainOptions()
    print("Thank you!")

mainLoop()