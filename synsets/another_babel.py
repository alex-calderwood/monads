import babelnet as bn
from babelnet import BabelSynsetID, Language
from babelnet.data.relation import BabelPointer

by = bn.get_synset(BabelSynsetID('bn:00015556n'))
for edge in by.outgoing_edges(BabelPointer.ANY_HYPERNYM):
    print(str(by.id) + '\t' + by.main_sense(Language.EN).full_lemma,
          edge.pointer, edge.id_target, sep=' - ')
