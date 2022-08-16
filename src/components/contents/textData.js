import ArrayList from './DynamicArray';
import DoublyLinkedList from '../contents/DoublyLinkedList'
import Deques from '../contents/Deques'
import HashMaps from '../contents/HashMaps'
import BinarySearchTrees from './BinarySearchTrees'
import Heaps from '../contents/Heaps'
import AVLs from '../contents/AVLs'
import SelectionSort from '../contents/SelectionSort';
import InsertionSort from './InsertionSort';
import CocktailSort from './CocktailSort';
import MergeSort from './MergeSort';
import QuickSort from './QuickSort';
import LSDRadixSort from './LSDRadixSort';
import KnuthMorrisPratt from './KnuthMorrisPratt';
import BoyerMoore from './BoyerMoore';
import RabinKarp from './RabinKarp';
import BFS from './BFS';
import Dijkstra from './Dijkstra';
import Kruskal from './Kruskal';
import DFS from './DFS';


// export let algorithmList = [

//     <ArrayList />,
//     <DoublyLinkedList />,
//     <Deques />,
//     <HashMaps />,
//     <BinarySearchTrees />,
//     <Heaps />,
//     <AVLs />,
//     <SelectionSort />,
//     <InsertionSort />,
//     <CocktailSort />,
//     <MergeSort />,
//     <QuickSort />,
//     <LSDRadixSort />,
//     <KnuthMorrisPratt />,
//     <BoyerMoore />,
//     <RabinKarp />,
//     <BFS />,
//     <DFS />,
//     <Dijkstra />,
//     <Kruskal />,
// ]


//  let algorithms = [
//     {
//         component: algorithmList[0],
//         description: description[0],
//         links: links[0]
//     },
//     {
//         component: algorithmList[1],
//         description: description[1],
//         links: links[1]
//     },
//     {
//         component: algorithmList[2],
//         description: description[2],
//         links: links[2]
//     },
//     {
//         component: algorithmList[3],
//         description: description[3],
//         links: links[3]
//     },
//     {
//         component: algorithmList[4],
//         description: description[4],
//         links: links[4]
//     },
//     {
//         component: algorithmList[5],
//         description: description[5],
//         links: links[5]
//     },
//     {
//         component: algorithmList[6],
//         description: description[6],
//         links: links[6]
//     },
//     {
//         component: algorithmList[7],
//         description: description[7],
//         links: links[7]
//     },
//     {
//         component: algorithmList[8],
//         description: description[8],
//         links: links[8]
//     },
//     {
//         component: algorithmList[9],
//         description: description[9],
//         links: links[9]
//     },
//     {
//         component: algorithmList[10],
//         description: description[10],
//         links: links[10]
//     },
//     {
//         component: algorithmList[11],
//         description: description[11],
//         links: links[11]
//     },
//     {
//         component: algorithmList[12],
//         description: description[12],
//         links: links[12]
//     },
//     {
//         component: algorithmList[13],
//         description: description[13],
//         links: links[13]
//     },
//     {
//         component: algorithmList[14],
//         description: description[14],
//         links: links[14]
//     },
//     {
//         component: algorithmList[15],
//         description: description[15],
//         links: links[15]
//     },
//     {
//         component: algorithmList[16],
//         description: description[16],
//         links: links[16]
//     },
//     {
//         component: algorithmList[17],
//         description: description[17],
//         links: links[17]
//     },
//     {
//         component: algorithmList[18],
//         description: description[18],
//         links: links[18]
//     },  {
//         component: algorithmList[19],
//         description: description[19],
//         links: links[19]
//     },

// ]
export let table = {
    col: [
        {

            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Big O',
            dataIndex: 'bigO',
            key: 'bigO',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },


    ],

    datasource: [
        // arraylist
        [
            {
                key: '1',
                name: 'addAtIndex',
                bigO: 'O(1) for index size and O(n) for all other cases',
                description: 'Adds the element to the specified index.',
            },
            {
                key: '2',
                name: 'addToFront',
                bigO: 'O(n)',
                description: 'Adds the element to the front of the list.',
            },
            {
                key: '31',
                name: 'addToBack',
                bigO: ' O(1)',
                description: 'Adds the element to the back of the list.',
            },
            {
                key: '4',
                name: 'removeAtIndex',
                bigO: 'O(1) for index size - 1 and O(n) for all other cases.',
                description: 'Removes and returns the element at the specified index.',
            },
            {
                key: '5',
                name: 'removeFromFront',
                bigO: 'O(n)',
                description: 'Removes and returns the first element of the list.',
            },
            {
                key: '6',
                name: 'removeFromBack',
                bigO: 'O(1)',
                description: 'Removes and returns the last element of the list.',
            },
            {
                key: '7',
                name: 'get',
                bigO: 'O(1)',
                description: 'Returns the element at the specified index.',
            },
            {
                key: '8',
                name: 'isEmpty',
                bigO: 'O(1)',
                description: 'Returns whether or not the list is empty.',
            },
            {
                key: '9',
                name: 'clear',
                bigO: 'O(1)',
                description: 'Clears the list.',
            },
        ],
        // DoublyLinkedList
        [
            {
                key: '1',
                name: 'addAtIndex',
                bigO: 'O(1) for index size and O(n) for all other cases',
                description: 'Adds the element to the specified index.',
            },
            {
                key: '2',
                name: 'addToFront',
                bigO: 'O(1)',
                description: 'Adds the element to the front of the list.',
            },
            {
                key: '3',
                name: 'addToBack',
                bigO: ' O(1)',
                description: 'Adds the element to the back of the list.',
            },
            {
                key: '4',
                name: 'removeAtIndex',
                bigO: 'Must be O(1) for indices 0 and size - 1 and O(n) for all other cases.',
                description: 'Removes and returns the element at the specified index.',
            },
            {
                key: '5',
                name: 'removeFromFront',
                bigO: 'O(1)',
                description: 'Removes and returns the first element of the list.',
            },
            {
                key: '6',
                name: 'removeFromBack',
                bigO: 'O(1)',
                description: 'Removes and returns the last element of the list.',
            },
            {
                key: '7',
                name: 'get',
                bigO: ' O(1) for indices 0 and size - 1 and O(n) for all other cases',
                description: 'Returns the element at the specified index.',
            },
            {
                key: '8',
                name: 'isEmpty',
                bigO: 'O(1)',
                description: 'Returns whether or not the list is empty.',
            },
            {
                key: '9',
                name: 'clear',
                bigO: 'O(1)',
                description: 'Clears the list.',
            },
            {
                key: '10',
                name: 'removeLastOccurrence',
                bigO: 'O(1) if data is in the tail and O(n) for all other cases',
                description: 'Removes and returns the last copy of the given data from the list.',
            },
        ],
        // Deque
        [
            {
                key: '1',
                name: 'addFirst',
                bigO: 'O(1)',
                description: 'Adds the element to the front of the deque.',
            },
            {
                key: '2',
                name: 'addLast',
                bigO: 'O(1)',
                description: 'Adds the element to the back of the deque.',
            },
            {
                key: '3',
                name: 'removeFirst',
                bigO: ' O(1)',
                description: 'Removes and returns the first element of the deque.',
            },
            {
                key: '4',
                name: 'removeLast',
                bigO: 'O(1)',
                description: 'Removes and returns the last element of the deque',
            },
            {
                key: '5',
                name: 'getFirst',
                bigO: 'O(1)',
                description: 'Returns the first data of the deque without removing it',
            },
            {
                key: '6',
                name: 'removeFromBack',
                bigO: 'O(1)',
                description: 'Removes and returns the last element of the list.',
            },
            {
                key: '7',
                name: 'getLast',
                bigO: ' O(1)',
                description: 'Returns the last data of the deque without removing it',
            },

        ],
        // HashMap
        [
            {
                key: '1',
                name: 'put',
                bigO: 'O(1) but O(n) with bad hashcode (we need to walk through all elements)',
            },
            {
                key: '2',
                name: 'remove',
                bigO: 'O(1) but O(n) with bad hashcode (we need to walk through all elements)',
                description: 'Removes the entry with a matching key from map by marking the entry as removed.',
            },
            {
                key: '3',
                name: 'get',
                bigO: ' O(1) but O(n) with bad hashcode (we need to walk through all elements)',
                description: 'Gets the value associated with the given key.',
            },
            {
                key: '4',
                name: 'containsKey',
                bigO: 'O(1) but O(n) with bad hashcode (we need to walk through all elements)',
                description: 'Returns whether or not the key is in the map',
            },
            {
                key: '5',
                name: 'resizeBackingTable',
                bigO: 'O(n)',
                description: 'Resize the backing table to length',
            },
            {
                key: '6',
                name: 'clear',
                bigO: 'O(1)',
                description: 'Clears the map.',
            }
        ],
        // Binary Trees
        [
            {
                key: '1',
                name: 'add',
                bigO: ' O(log n) for a balanced tree and O(n) for worst case',
                description: 'dds the element to the tree.',
            },
            {
                key: '2',
                name: 'remove',
                bigO: 'O(log n) for a balanced tree and O(n) for worst case',
                description: 'Removes and returns the element from the tree matching the given parameter',
            },
            {
                key: '3',
                name: 'get',
                bigO: ' O(log n) for a balanced tree and O(n) for worst case',
                description: 'Returns the element from the tree matching the given parameter.',
            },
            {
                key: '4',
                name: 'contains',
                bigO: 'O(log n) for a balanced tree and O(n) for worst case',
                description: 'Returns whether or not data matching the given parameter is contained within the tree',
            },
            {
                key: '5',
                name: 'preorder',
                bigO: 'O(n)',
                description: 'Generate a pre-order traversal of the tree.',
            },
            {
                key: '6',
                name: 'inorder',
                bigO: 'O(n)',
                description: 'Generate a in-order traversal of the tree.',
            },
            {
                key: '7',
                name: 'postorder',
                bigO: 'O(n)',
                description: 'Generate a post-order traversal of the tree.',
            },
            {
                key: '8',
                name: 'levelorder',
                bigO: 'O(n)',
                description: 'Generate a level-order traversal of the tree.',
            },
            {
                key: '9',
                name: 'height',
                bigO: 'O(n)',
                description: ' Returns the height of the root of the tree.',
            },
            {
                key: '10',
                name: 'clear',
                bigO: 'O(1)',
                description: ' Clears the tree.',
            }
        ],
        // Heaps
        [
            {
                key: '1',
                name: 'MinHeap',
                bigO: ' O(n)',
                description: 'Creates a properly ordered heap from a set of initial values.',
            },
            {
                key: '2',
                name: 'add',
                bigO: 'O(log n)',
                description: 'Adds an item to the heap. If the backing array is full (except for index 0) and you\'re trying to add a new item, then double its capacity) ',
            },
            {
                key: '3',
                name: 'remove',
                bigO: ' O(log n)',
                description: 'Removes and returns the min item of the heap. As usual for array-backed structures, be sure to null out spots as you remove',
            }
        ],
        // AVLs
        [
            {
                key: '1',
                name: 'add',
                bigO: 'O(log n)',
                description: 'Adds the element to the tree.',
            },
            {
                key: '2',
                name: 'update',
                bigO: 'O(log n)',
                description: 'update balance factor and height.',
            },
            {
                key: '3',
                name: 'remove',
                bigO: 'O(log n)',
                description: 'Removes and returns the element from the tree matching the given parameter.',
            },
            {
                key: '4',
                name: 'get',
                bigO: 'O(log n)',
                description: 'Returns the element from the tree matching the given parameter.',
            },
            {
                key: '5',
                name: 'contains',
                bigO: 'O(log n)',
                description: 'Returns whether or not data matching the given parameter is contained within the tree.',
            },
            {
                key: '6',
                name: 'height',
                bigO: 'O(1)',
                description: 'Returns the height of the root of the tree.',
            },
            {
                key: '7',
                name: 'clear',
                bigO: 'O(1)',
                description: 'Clears the tree.',
            },
            {
                key: '9',
                name: 'predecessor',
                bigO: 'O(log n)',
                description: 'Returns the largest data that is smaller than the current data.',
            },
            
        ],
        // Selection sort
        [
            {
                key: '1',
                name: 'Best case',
                bigO: 'O(n^2)',
                description: '',
            },
            {
                key: '2',
                name: 'Worst case',
                bigO: 'O(n^2)',
                description: '',
            },
            {
                key: '3',
                name: 'Average case',
                bigO: 'O(n^2)',
                description: '',
            }
        ],

        // Insertion sort
        [
            {
                key: '1',
                name: 'Best case',
                bigO: 'O(n)',
                description: 'when the array is already sorted',
            },
            {
                key: '2',
                name: 'Worst case',
                bigO: 'O(n^2)',
                description: 'when the array is reversly sorted (in descending order)',
            },
            {
                key: '3',
                name: 'Average case',
                bigO: 'O(n^2)',
                description: '',
            }
        ],
        // Cocktail sort
        [
            {
                key: '1',
                name: 'Best case',
                bigO: 'O(n)',
                description: 'when the array is already sorted',
            },
            {
                key: '2',
                name: 'Worst case',
                bigO: 'O(n^2)',
                description: 'when the array is reversly sorted.',
            },
            {
                key: '3',
                name: 'Average case',
                bigO: 'O(n^2)',
                description: '',
            }
        ],
        // Merge  sort
        [
            {
                key: '1',
                name: 'Best case',
                bigO: 'O(n log n)',
                description: '',
            },
            {
                key: '2',
                name: 'Worst case',
                bigO: 'O(n log n)',
                description: '',
            },
            {
                key: '3',
                name: 'Average case',
                bigO: 'O(n log n)',
                description: '',
            }
        ],
        // Quick  sort
        [
            {
                key: '1',
                name: 'Best case',
                bigO: 'O(n log n)',
                description: 'when the partitions have the most balanced partitions possible',
            },
            {
                key: '2',
                name: 'Worst case',
                bigO: 'O(n^2)',
                description: 'when the partitions have the most unbalanced partitions possible.',
            },
            {
                key: '3',
                name: 'Average case',
                bigO: 'O(n log n)',
                description: '',
            }
        ],
        // LSD Radix  sort
        [
            {
                key: '1',
                name: 'Best case',
                bigO: 'O(kn) where k is the number of digits in the longest number',
                description: '',
            },
            {
                key: '2',
                name: 'Worst case',
                bigO: 'O(kn) where k is the number of digits in the longest number',
                description: '',
            },
            {
                key: '3',
                name: 'Average case',
                bigO: 'O(kn) where k is the number of digits in the longest number',
                description: '',
            }
        ],
        // KMP 
        [
            {
                key: '1',
                name: 'Best case  (searching for all occurrences)',
                bigO: 'O(m + n) where m is the length of the pattern you search',
                description: '',
            },
            {
                key: '2',
                name: 'Best case (searching for just the first occurrence)',
                bigO: 'O(m) where m is the length of the pattern you search',
                description: '',
            },
            {
                key: '3',
                name: 'Worst case',
                bigO: 'O(m + n) where m is the length of the pattern you search',
                description: '',
            }
        ],
        // BM 
        [
            {
                key: '1',
                name: 'Best case  (searching for all occurrences)',
                bigO: 'O(n/m) where m is the length of the pattern you search',
                description: '',
            },
            {
                key: '2',
                name: 'Best case (searching for just the first occurrence)',
                bigO: 'O(m) where m is the length of the pattern you search',
                description: 'When searching for only the first match, Eg. text “aaabbbbaaabbabab”, pattern “aaab”',
            },
            {
                key: '3',
                name: 'Worst case',
                bigO: 'O(mn) where m is the length of the pattern you search',
                description: 'When the first character in the pattern is always a mismatching character,Eg. text “aaaaaaaaaaaaaaaa”, pattern “baaaaaa”',
            }
        ],
        // RK 
        [
            {
                key: '1',
                name: 'Best case  (searching for all occurrences)',
                bigO: 'O(m + n) where m is the length of the pattern you search',
                description: '',
            },
            {
                key: '2',
                name: 'Best case (searching for just the first occurrence)',
                bigO: 'O(m) where m is the length of the pattern you search',
                description: 'When searching for only the first match, Eg. text “aaabbbbaaabbabab”, pattern “aaab”',
            },
            {
                key: '3',
                name: 'Worst case',
                bigO: 'O(mn) where m is the length of the pattern you search',
                description: 'the pattern hash and the text hash are always equal (possibly due to a poor rolling hash function used), and each character is compared',
            }
        ],
        // BFS 
        [
            {
                key: '1',
                name: 'BFS',
                bigO: 'O(V+E) where V is number of vertices and E is number of edges',
                description: '',
            }
        ],
        // DFS 
        [
            {
                key: '1',
                name: 'DFS',
                bigO: 'O(V+E) where V is number of vertices and E is number of edges',
                description: '',
            }
        ],
        // Dijkstra 
        [
            {
                key: '1',
                name: 'Dijkstra\'s',
                bigO: 'O((V+E)logV) where V is number of vertices and E is number of edges',
                description: 'Finds the single-source shortest distance between the start vertex and  all vertices given a weighted graph.',
            }
        ],

        // Kruskal 
        [
            {
                key: '1',
                name: 'Kruskal\'s',
                bigO: 'O(ElogV) where V is number of vertices and E is number of edges',
                description: 'returns the Minimal Spanning Tree (MST) in the form of a set of Edges.',
            }
        ],
    ]
}



