# Documentation Links
# https://babelnet.org/guide
# https://babelnet.org/pydoc/1.1/

import os, sys
from pprint import pprint
from random import choice

file = "./babelnet_conf.yml"
api_key = "b4fe4e71-0b56-40ae-a5ce-f9f9f044f27d"
with open(file, 'w') as f:
  f.write(f"RESTFUL_KEY: '{api_key}'")
os.environ["BABELNET_CONF"] = "/Users/alex/code/poetry/babelnet_conf.yml"
import babelnet as bn
from babelnet.language import Language

# get synsets
def get_synsets(word):
  synset_list = bn.get_synsets(word, from_langs=[Language.EN])
  return synset_list

def get_a_sense(word):
  try: 
    synset_list = get_synsets(word)
    rand_synset = choice(synset_list)
    senses = rand_synset.senses()
    rand_sense = choice(senses)

    adjacent_synset_list = get_synsets(str(rand_sense.lemma))
    adjacent_synset = choice(adjacent_synset_list)
    adjacent_senses = adjacent_synset.senses()
    new_sense = choice(adjacent_senses)
    adjacent_word = new_sense.normalized_lemma.replace("_", " ")
  except Exception as e:
    print(f"{word}:{e}")
    return word

  return adjacent_word

def nonsense(poem):
  out = ""
  for word in poem.split():
    if choice(range(1)) == 0:
      word = get_a_sense(word)
    out += word + " "
  return out

def targeted_nonsense(text):
  out = ""
  for word in text.split():
    if word.startswith("_"):
      word = word.replace("_", "")
      word = get_a_sense(word)
      # make it bold
      word = "\033[1m" + word + "\033[0m"
    out += word + " "
  return out

# print(nonsense("Take life lightly for lightness is not superficiality but gliding above things not having weights on your heart."))
