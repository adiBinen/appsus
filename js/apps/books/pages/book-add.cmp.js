// import { getGoogleBooks } from '../service/google-api.service.js';
import bookService from '../services/book.service.js';
// import { eventBus, USER_MSG_SUCCESS, USER_MSG_FAILURE } from '../event-bus.js';

export default {
    template: `
        <section class="book-google-add grid">
            <button class="btn btn-back" @click="goBack">
                <i class="far fa-caret-square-left"></i> <span>Back</span>
            </button>
            <h1>Add a New Book From Google Books' Repository</h1>
            <input 
                @input="getBooks" v-model="searchTerm"
                type="search" class="book-add-input" autofocus placeholder="Search for an existing book." />
            <ul>
                <li v-for="book in googleBooks" :key="book.id" class="li-google-book" v-if="!book.isAdded">
                    {{book.volumeInfo.title}}
                    <button class="btn btn-gbook-add" 
                        @click="addGoogleBook(book.id)"
                    >
                        <i class="fas fa-plus-circle"></i>
                    </button>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            searchTerm: '',
            googleBooks: [],
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        getBooks() {
            getGoogleBooks(this.searchTerm)
                .then(books => this.googleBooks = books);

            this.googleBooks
                .filter(book => book.volumeInfo.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
        },
        addGoogleBook(bookId) {
            let googleBook = this.googleBooks.find(book => book.id === bookId);
            bookService.addGoogleBook(googleBook)
                .then(successMsg => {
                    eventBus.$emit(USER_MSG_SUCCESS, successMsg);
                })
                .catch(failureMsg => {
                    eventBus.$emit(USER_MSG_FAILURE, failureMsg);
                });
        }
    },
}




/* addbook from google

{
    "kind": "books#volumes",
    "totalItems": 473,
    "items": [
     {
      "kind": "books#volume",
      "id": "nBuA0hmspdMC",
      "etag": "+J0sZyj7ZMk",
      "selfLink": "https://www.googleapis.com/books/v1/volumes/nBuA0hmspdMC",
      "volumeInfo": {
       "title": "Effective JavaScript",
       "subtitle": "68 Specific Ways to Harness the Power of JavaScript",
       "authors": [
        "David Herman"
       ],
       "publisher": "Addison-Wesley",
       "publishedDate": "2012-11-26",
       "description": "“It’s uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You’ll find when you finish the book that you’ve gained a strong and comprehensive sense of mastery.” —Paul Irish, developer advocate, Google Chrome “This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It’s one of the few books on JS that I’ll recommend without hesitation.” —Alex Russell, TC39 member, software engineer, Google In order to truly master JavaScript, you need to learn how to work effectively with the language’s flexible, expressive features and how to avoid its pitfalls. No matter how long you’ve been writing JavaScript code, Effective JavaScript will help deepen your understanding of this powerful language, so you can build more predictable, reliable, and maintainable programs. Author David Herman, with his years of experience on Ecma’s JavaScript standardization committee, illuminates the language’s inner workings as never before—helping you take full advantage of JavaScript’s expressiveness. Reflecting the latest versions of the JavaScript standard, the book offers well-proven techniques and best practices you’ll rely on for years to come. Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You’ll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency. Key features include Better ways to use prototype-based object-oriented programming Subtleties and solutions for working with arrays and dictionary objects Precise and practical explanations of JavaScript’s functions and variable scoping semantics Useful JavaScript programming patterns and idioms, such as options objects and method chaining In-depth guidance on using JavaScript’s unique “run-to-completion” approach to concurrency",
       "industryIdentifiers": [
        {
         "type": "ISBN_13",
         "identifier": "9780132902250"
        },
        {
         "type": "ISBN_10",
         "identifier": "0132902257"
        }
       ],
       "readingModes": {
        "text": true,
        "image": true
       },
       "pageCount": 240,
       "printType": "BOOK",
       "categories": [
        "Computers"
       ],
       "averageRating": 5.0,
       "ratingsCount": 1,
       "maturityRating": "NOT_MATURE",
       "allowAnonLogging": true,
       "contentVersion": "2.7.6.0.preview.3",
       "panelizationSummary": {
        "containsEpubBubbles": false,
        "containsImageBubbles": false
       },
       "imageLinks": {
        "smallThumbnail": "http://books.google.com/books/content?id=nBuA0hmspdMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        "thumbnail": "http://books.google.com/books/content?id=nBuA0hmspdMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
       },
       "language": "en",
       "previewLink": "http://books.google.com/books?id=nBuA0hmspdMC&printsec=frontcover&dq=effective+javascript&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
       "infoLink": "https://play.google.com/store/books/details?id=nBuA0hmspdMC&source=gbs_api",
       "canonicalVolumeLink": "https://market.android.com/details?id=book-nBuA0hmspdMC"
      },
      "saleInfo": {
       "country": "IL",
       "saleability": "FOR_SALE",
       "isEbook": true,
       "listPrice": {
        "amount": 79.0,
        "currencyCode": "ILS"
       },
       "retailPrice": {
        "amount": 79.0,
        "currencyCode": "ILS"
       },
       "buyLink": "https://play.google.com/store/books/details?id=nBuA0hmspdMC&rdid=book-nBuA0hmspdMC&rdot=1&source=gbs_api",
       "offers": [
        {
         "finskyOfferType": 1,
         "listPrice": {
          "amountInMicros": 7.9E7,
          "currencyCode": "ILS"
         },
         "retailPrice": {
          "amountInMicros": 7.9E7,
          "currencyCode": "ILS"
         }
        }
       ]
      },
      "accessInfo": {
       "country": "IL",
       "viewability": "PARTIAL",
       "embeddable": true,
       "publicDomain": false,
       "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
       "epub": {
        "isAvailable": false
       },
       "pdf": {
        "isAvailable": false
       },
       "webReaderLink": "http://play.google.com/books/reader?id=nBuA0hmspdMC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
       "accessViewStatus": "SAMPLE",
       "quoteSharingAllowed": false
      },
      "searchInfo": {
       "textSnippet": "You’ll find when you finish the book that you’ve gained a strong and comprehensive sense of mastery.” —Paul Irish, developer advocate, Google Chrome “This is not a book for those looking for shortcuts; rather it is hard-won ..."
      }
     },
    }
    */


const SAMPLE = {
    "kind": "books#volumes",
    "totalItems": 473,
    "items": [
        {
            "kind": "books#volume",
            "id": "nBuA0hmspdMC",
            "etag": "+J0sZyj7ZMk",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/nBuA0hmspdMC",
            "volumeInfo": {
                "title": "Effective JavaScript",
                "subtitle": "68 Specific Ways to Harness the Power of JavaScript",
                "authors": [
                    "David Herman"
                ],
                "publisher": "Addison-Wesley",
                "publishedDate": "2012-11-26",
                "description": "“It’s uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You’ll find when you finish the book that you’ve gained a strong and comprehensive sense of mastery.” —Paul Irish, developer advocate, Google Chrome “This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It’s one of the few books on JS that I’ll recommend without hesitation.” —Alex Russell, TC39 member, software engineer, Google In order to truly master JavaScript, you need to learn how to work effectively with the language’s flexible, expressive features and how to avoid its pitfalls. No matter how long you’ve been writing JavaScript code, Effective JavaScript will help deepen your understanding of this powerful language, so you can build more predictable, reliable, and maintainable programs. Author David Herman, with his years of experience on Ecma’s JavaScript standardization committee, illuminates the language’s inner workings as never before—helping you take full advantage of JavaScript’s expressiveness. Reflecting the latest versions of the JavaScript standard, the book offers well-proven techniques and best practices you’ll rely on for years to come. Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You’ll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency. Key features include Better ways to use prototype-based object-oriented programming Subtleties and solutions for working with arrays and dictionary objects Precise and practical explanations of JavaScript’s functions and variable scoping semantics Useful JavaScript programming patterns and idioms, such as options objects and method chaining In-depth guidance on using JavaScript’s unique “run-to-completion” approach to concurrency",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9780132902250"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "0132902257"
                    }
                ],
                "readingModes": {
                    "text": true,
                    "image": true
                },
                "pageCount": 240,
                "printType": "BOOK",
                "categories": [
                    "Computers"
                ],
                "averageRating": 5.0,
                "ratingsCount": 1,
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": true,
                "contentVersion": "2.7.6.0.preview.3",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=nBuA0hmspdMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=nBuA0hmspdMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=nBuA0hmspdMC&printsec=frontcover&dq=effective+javascript&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
                "infoLink": "https://play.google.com/store/books/details?id=nBuA0hmspdMC&source=gbs_api",
                "canonicalVolumeLink": "https://market.android.com/details?id=book-nBuA0hmspdMC"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "FOR_SALE",
                "isEbook": true,
                "listPrice": {
                    "amount": 79.0,
                    "currencyCode": "ILS"
                },
                "retailPrice": {
                    "amount": 79.0,
                    "currencyCode": "ILS"
                },
                "buyLink": "https://play.google.com/store/books/details?id=nBuA0hmspdMC&rdid=book-nBuA0hmspdMC&rdot=1&source=gbs_api",
                "offers": [
                    {
                        "finskyOfferType": 1,
                        "listPrice": {
                            "amountInMicros": 7.9E7,
                            "currencyCode": "ILS"
                        },
                        "retailPrice": {
                            "amountInMicros": 7.9E7,
                            "currencyCode": "ILS"
                        }
                    }
                ]
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=nBuA0hmspdMC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "You’ll find when you finish the book that you’ve gained a strong and comprehensive sense of mastery.” —Paul Irish, developer advocate, Google Chrome “This is not a book for those looking for shortcuts; rather it is hard-won ..."
            }
        },
        {
            "kind": "books#volume",
            "id": "--gvDwAAQBAJ",
            "etag": "82C6AeasO1U",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/--gvDwAAQBAJ",
            "volumeInfo": {
                "title": "An Effective Guide to Modern JavaScript",
                "subtitle": "(ECMAScript 2017 / ES 8)",
                "authors": [
                    "Chong Lip Phang"
                ],
                "publisher": "Chong Lip Phang",
                "publishedDate": "2017-08-08",
                "description": "ES8 was finalized in June 2017. This book: - effectively teaches standard JavaScript from A to Z. - includes all the JavaScript common APIs, presented in a highly organized fashion. - lists in the Appendix the new features introduced in each JavaScript edition from ES5 to ES8 and beyond, and illustrates all of them. - clearly explains advanced concepts such as closures, Proxy, generators, Promise, async functions, and Atomics. - covers OOP techniques -- classical JavaScript OOP, the new 'class' syntax, data encapsulation, multiple inheritance, abstract classes, object relay etc. - teaches you how to define and use iterators and various iterables. - turns you into an efficient JavaScript coder.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9781974207923"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "1974207927"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 127,
                "printType": "BOOK",
                "categories": [
                    "Computers"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": true,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=--gvDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=--gvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=--gvDwAAQBAJ&pg=PA42&dq=effective+javascript&hl=&as_pt=BOOKS&cd=2&source=gbs_api",
                "infoLink": "https://play.google.com/store/books/details?id=--gvDwAAQBAJ&source=gbs_api",
                "canonicalVolumeLink": "https://market.android.com/details?id=book---gvDwAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "FOR_SALE",
                "isEbook": true,
                "listPrice": {
                    "amount": 32.0,
                    "currencyCode": "ILS"
                },
                "retailPrice": {
                    "amount": 32.0,
                    "currencyCode": "ILS"
                },
                "buyLink": "https://play.google.com/store/books/details?id=--gvDwAAQBAJ&rdid=book---gvDwAAQBAJ&rdot=1&source=gbs_api",
                "offers": [
                    {
                        "finskyOfferType": 1,
                        "listPrice": {
                            "amountInMicros": 3.2E7,
                            "currencyCode": "ILS"
                        },
                        "retailPrice": {
                            "amountInMicros": 3.2E7,
                            "currencyCode": "ILS"
                        }
                    }
                ]
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/An_Effective_Guide_to_Modern_JavaScript-sample-pdf.acsm?id=--gvDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=--gvDwAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "work.\u003cb\u003ejs\u003c/b\u003e onmessage = n=&gt;{ postMessage(&#39;abcdefghijklmnopqrstwxyz&#39;[Math.floor(\u003cbr\u003e\nMath.random()*26)]); } &lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;&lt;script&gt;\u003cbr\u003e\nfunction DoWork(n){ return new Promise((resolve,reject)=&gt;{ var w = new&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "lT2g_y4VYx0C",
            "etag": "C0uRQfYvS0w",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/lT2g_y4VYx0C",
            "volumeInfo": {
                "title": "Effective JavaScript",
                "authors": [
                    "Devid Herman"
                ],
                "publisher": "翔泳社",
                "publishedDate": "2013-04-13",
                "description": "JavaScriptを使うときに知っておきたい68の冴えたやり方 もはやWebアプリケーション作成のデファクトスタンダードとなった感のある開発言語・JavaScriptが、定番の“Effective”シリーズに、満を持して登場!微妙な挙動に悩むプログラマや、よりシンプルで可読性に富んだコードを志向する開発者に、実践的で即効性のある処方を施してくれる1冊です。68の「なるほど!」は、伊達じゃない。 ※本電子書籍は同名出版物を底本とし作成しました。記載内容は印刷出版当時のものです。 ※印刷出版再現のため電子書籍としては不要な情報を含んでいる場合があります。 ※印刷出版とは異なる表記・表現の場合があります。予めご了承ください。 ※プレビューにてお手持ちの電子端末での表示状態をご確認の上、商品をお買い求めください。 (翔泳社)",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9784798131528"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "4798131520"
                    }
                ],
                "readingModes": {
                    "text": true,
                    "image": true
                },
                "pageCount": 202,
                "printType": "BOOK",
                "categories": [
                    "Technology & Engineering"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": true,
                "contentVersion": "4.1329.533.0.preview.3",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=lT2g_y4VYx0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=lT2g_y4VYx0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=lT2g_y4VYx0C&printsec=frontcover&dq=effective+javascript&hl=&as_pt=BOOKS&cd=3&source=gbs_api",
                "infoLink": "https://play.google.com/store/books/details?id=lT2g_y4VYx0C&source=gbs_api",
                "canonicalVolumeLink": "https://market.android.com/details?id=book-lT2g_y4VYx0C"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "FOR_SALE",
                "isEbook": true,
                "listPrice": {
                    "amount": 105.0,
                    "currencyCode": "ILS"
                },
                "retailPrice": {
                    "amount": 105.0,
                    "currencyCode": "ILS"
                },
                "buyLink": "https://play.google.com/store/books/details?id=lT2g_y4VYx0C&rdid=book-lT2g_y4VYx0C&rdot=1&source=gbs_api",
                "offers": [
                    {
                        "finskyOfferType": 1,
                        "listPrice": {
                            "amountInMicros": 1.05E8,
                            "currencyCode": "ILS"
                        },
                        "retailPrice": {
                            "amountInMicros": 1.05E8,
                            "currencyCode": "ILS"
                        }
                    }
                ]
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/Effective_JavaScript-sample-epub.acsm?id=lT2g_y4VYx0C&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/Effective_JavaScript-sample-pdf.acsm?id=lT2g_y4VYx0C&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=lT2g_y4VYx0C&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "JavaScriptを使うときに知っておきたい68の冴えたやり方 もはやWebアプリケーション作成のデファクトスタンダードとなった感のある開発言語・JavaScriptが、定番の“Effective”シリー ..."
            }
        },
        {
            "kind": "books#volume",
            "id": "25AEAwAAQBAJ",
            "etag": "lithZHKIdQc",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/25AEAwAAQBAJ",
            "volumeInfo": {
                "title": "You Don't Know JS: Scope & Closures",
                "authors": [
                    "Kyle Simpson"
                ],
                "publisher": "\"O'Reilly Media, Inc.\"",
                "publishedDate": "2014-03-10",
                "description": "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. This concise yet in-depth guide takes you inside scope and closures, two core concepts you need to know to become a more efficient and effective JavaScript programmer. You’ll learn how and why they work, and how an understanding of closures can be a powerful part of your development skillset. Like other books in the \"You Don’t Know JS\" series, Scope and Closures dives into trickier parts of the language that many JavaScript programmers simply avoid. Armed with this knowledge, you can achieve true JavaScript mastery. Learn about scope, a set of rules to help JavaScript engines locate variables in your code Go deeper into nested scope, a series of containers for variables and functions Explore function- and block-based scope, “hoisting”, and the patterns and benefits of scope-based hiding Discover how to use closures for synchronous and asynchronous tasks, including the creation of JavaScript libraries",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9781449335540"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "1449335543"
                    }
                ],
                "readingModes": {
                    "text": true,
                    "image": true
                },
                "pageCount": 98,
                "printType": "BOOK",
                "categories": [
                    "Computers"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": true,
                "contentVersion": "1.7.7.0.preview.3",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=25AEAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=25AEAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=25AEAwAAQBAJ&printsec=frontcover&dq=effective+javascript&hl=&as_pt=BOOKS&cd=4&source=gbs_api",
                "infoLink": "https://play.google.com/store/books/details?id=25AEAwAAQBAJ&source=gbs_api",
                "canonicalVolumeLink": "https://market.android.com/details?id=book-25AEAwAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "FOR_SALE",
                "isEbook": true,
                "listPrice": {
                    "amount": 17.0,
                    "currencyCode": "ILS"
                },
                "retailPrice": {
                    "amount": 17.0,
                    "currencyCode": "ILS"
                },
                "buyLink": "https://play.google.com/store/books/details?id=25AEAwAAQBAJ&rdid=book-25AEAwAAQBAJ&rdot=1&source=gbs_api",
                "offers": [
                    {
                        "finskyOfferType": 1,
                        "listPrice": {
                            "amountInMicros": 1.7E7,
                            "currencyCode": "ILS"
                        },
                        "retailPrice": {
                            "amountInMicros": 1.7E7,
                            "currencyCode": "ILS"
                        }
                    }
                ]
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": true
                },
                "pdf": {
                    "isAvailable": true
                },
                "webReaderLink": "http://play.google.com/books/reader?id=25AEAwAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language."
            }
        },
        {
            "kind": "books#volume",
            "id": "gg20DgAAQBAJ",
            "etag": "dmFLgk6qwbc",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/gg20DgAAQBAJ",
            "volumeInfo": {
                "title": "Effective JavaScript 中文版(電子書)",
                "subtitle": "",
                "authors": [
                    "David Herman"
                ],
                "publisher": "碁峰資訊股份有限公司",
                "publishedDate": "2013-07-29",
                "description": "駕馭 JavaScript 的 68 個具體作法 JavaScript 發明人 Brendan Eich 專文推薦 「少有程式語言達人能夠像 David 這樣寫出流暢通順且措辭淺白的文字，透過其深邃的洞察力，他以引人入勝的方式帶我們逐一探索 JavaScript 的語法和語意，一路提醒我們要特別注意的事項，並以實際的使用案例來補充說明，步調和緩而舒適。讀完此書後，你會對 JavaScript 有更穩健且透徹的理解。」 —Paul Irish，Google Chrome 的開發人員大使 「這本書並不適合那些尋找捷徑的人，這是刻苦獲得的經驗所提煉出來的精華。它是少數我會毫不猶豫推薦的 JavaScript 書籍。」 —Alex Russell，TC39 成員、Google 軟體工程師 為了真正精通 JavaScript，你必須知道如何有效運用這個語言富有彈性又具表達能力的特色，以及知道如何避免其中常見的陷阱。不管你已經撰寫了多久的 JavaScript 程式碼，Effective JavaScript 都能增進你對這個強大語言的理解，讓你能夠建置更容易預測、更可靠且更容易維護的程式。 作者 David Herman 具有 Ecma 的 JavaScript 標準化委員會數年的工作經驗，他以前所未見的深度闡明這個語言的內部運作原理，幫助你完全掌握 JavaScript 強大的表達能力。立基於 JavaScript 最新的幾個版本，本書提供經過充分驗證的技巧以及最佳實務做法，協助你為未來的開發工作做好準備。 Effective JavaScript 是由 68 個經過驗證、能夠幫助你寫出更好的 JavaScript 程式碼的具體作法所構成，並輔以實例來闡述說明。你會學到如何為每個專案挑選適當的程式寫作風格、管理無法預料的問題，並以更良好的方式來處理 JavaScript 程式設計的各個面向，諸如資料結構或共時性（concurrency）。關鍵的特色包括： ■ 以更好的方式來使用基於原型（prototype）的物件導向程式設計 ■ 使用陣列與字典（dictionary）物件時可能遭遇到的細微問題以及它們的解法 ■ 對 JavaScript 函式與變數範疇（variable scoping）語意的精確且務實的解說 ■ 實用的 JavaScript 程式設計模式與慣用語法，例如選項物件（options objects）及方法鏈串（method chaining） ■ 深入介紹 JavaScript 獨特的「run-to-completion」共時模型 David Herman，Mozilla Research 的資深研究員。他是 Ecma TC39 的成員，這個委員會負責 JavaScript 的標準化工作。他擁有 Grinnell College 的電腦科學學士學位，以及 Northeastern University 的電腦科學碩士與博士學位。 #碁峰資訊 GOTOP Information Inc.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9789862768921"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "9862768924"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 244,
                "printType": "BOOK",
                "categories": [
                    "Computers"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": true,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=gg20DgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=gg20DgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "zh-CN",
                "previewLink": "http://books.google.com/books?id=gg20DgAAQBAJ&pg=PR3&dq=effective+javascript&hl=&as_pt=BOOKS&cd=5&source=gbs_api",
                "infoLink": "https://play.google.com/store/books/details?id=gg20DgAAQBAJ&source=gbs_api",
                "canonicalVolumeLink": "https://market.android.com/details?id=book-gg20DgAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "FOR_SALE",
                "isEbook": true,
                "listPrice": {
                    "amount": 53.0,
                    "currencyCode": "ILS"
                },
                "retailPrice": {
                    "amount": 53.0,
                    "currencyCode": "ILS"
                },
                "buyLink": "https://play.google.com/store/books/details?id=gg20DgAAQBAJ&rdid=book-gg20DgAAQBAJ&rdot=1&source=gbs_api",
                "offers": [
                    {
                        "finskyOfferType": 1,
                        "listPrice": {
                            "amountInMicros": 5.3E7,
                            "currencyCode": "ILS"
                        },
                        "retailPrice": {
                            "amountInMicros": 5.3E7,
                            "currencyCode": "ILS"
                        }
                    }
                ]
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/Effective_JavaScript_%E4%B8%AD%E6%96%87%E7%89%88_%E9%9B%BB%E5%AD%90%E6%9B%B8-sample-pdf.acsm?id=gg20DgAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=gg20DgAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "\u003cb\u003eEffective JavaScript\u003c/b\u003e 的各界好評「完全符合 \u003cb\u003eEffective\u003c/b\u003e Software Development 系列\u003cbr\u003e\n程式設計書籍的高標準,對從事專業 \u003cb\u003eJavaScript\u003c/b\u003e 程式設計工作的任何人來說,Dave \u003cbr\u003e\nHerman 的 \u003cb\u003eEffective JavaScript\u003c/b\u003e 都是必備的讀物。此書對於 \u003cb\u003eJavaScript\u003c/b\u003e 內部運作\u003cbr\u003e\n原理&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "yg0fBAAAQBAJ",
            "etag": "nwvQfhPj6YU",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/yg0fBAAAQBAJ",
            "volumeInfo": {
                "title": "Effective JavaScript　JavaScriptを使うときに知っておきたい68の冴えたやり方",
                "authors": [
                    "Devid Herman"
                ],
                "publisher": "翔泳社",
                "publishedDate": "2013-02-18",
                "description": "JavaScriptを使うときに知っておきたい68の冴えたやり方 もはやWebアプリケーション作成のデファクトスタンダードとなった感のある開発言語・JavaScriptが、定番の“Effective”シリーズに、満を持して登場！微妙な挙動に悩むプログラマや、よりシンプルで可読性に富んだコードを志向する開発者に、実践的で即効性のある処方を施してくれる1冊です。68の「なるほど！」は、伊達じゃない。",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9784798131115"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "4798131113"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 202,
                "printType": "BOOK",
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "4.487.0.0.preview.1",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=yg0fBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=yg0fBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=yg0fBAAAQBAJ&pg=PA91&dq=effective+javascript&hl=&as_pt=BOOKS&cd=6&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=yg0fBAAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Effective_JavaScript_JavaScript%E3%82%92%E4%BD%BF%E3%81%86.html?hl=&id=yg0fBAAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=yg0fBAAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "項目34 メソッドをプロトタイプに格納しよう \u003cb\u003eJavaScript\u003c/b\u003eでも、プロトタイプなしで\u003cbr\u003e\nプログラミングすることは完全に可能である。項目30 のUserクラスは、そのプロトタイプ\u003cbr\u003e\nで何も特別な定義をしなくても、次のように実装できそうだ。 function User(name,&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "ON_4twEACAAJ",
            "etag": "QxHCeLQeKGQ",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/ON_4twEACAAJ",
            "volumeInfo": {
                "title": "Effective Test Generation and Adequacy Assessment for Javascript-based Web Applications",
                "authors": [
                    "Shabnam Mirshokraie"
                ],
                "publishedDate": "2015",
                "industryIdentifiers": [
                    {
                        "type": "OTHER",
                        "identifier": "OCLC:1033148067"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "printType": "BOOK",
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=ON_4twEACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&cd=7&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=ON_4twEACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Effective_Test_Generation_and_Adequacy_A.html?hl=&id=ON_4twEACAAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=ON_4twEACAAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            }
        },
        {
            "kind": "books#volume",
            "id": "575XMQAACAAJ",
            "etag": "GisOwqLpcWo",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/575XMQAACAAJ",
            "volumeInfo": {
                "title": "Javascript",
                "subtitle": "Best Practices to Programming Code With Javascript",
                "authors": [
                    "Charlie Masterson"
                ],
                "publisher": "Createspace Independent Publishing Platform",
                "publishedDate": "2017-01-06",
                "description": "Learn how to write effective and efficient JavaScript code for programming success and continue your progress towards JavaScript programming mastery! In this Definitive JavaScript Guide on Best Practices, you're about to discover how to... Code more efficiently for Better Performance and Results! Spot the Common JavaScript Mistakes - From mismatched quotes, bad line breaks, HTML conflicts and more! Apply Recommended JavaScript approaches - The DO's and DONT's of JavaScript programming that will help you code achieve its goals immensely! Use Comments and Logging - the proper way to use comments and logging approaches that readers would thank you for! ... And much, much more! Added Benefits of owning this book: Gain a better grasp of efficient and effective JavaScript code to achieve programming success Speed up your programming abilities by avoiding time-wasting mistakes Gain the most important Best Practice concepts in your path towards JavaScript programming mastery! Learning JavaScript can help you in many ways both professionally and personally. By implementing the lessons in this book, not only would you learn one of today's most popular computer languages, but it will serve as your guide in accomplishing your JavaScript goals - whether as a fun hobby or as a starting point into a successful and long term Web Development career. Take action today and download this book for a limited time discount of only $13.38! Scroll to the top of the page and select the \"Buy now\" button.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_10",
                        "identifier": "1542405785"
                    },
                    {
                        "type": "ISBN_13",
                        "identifier": "9781542405782"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 60,
                "printType": "BOOK",
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=575XMQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=575XMQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=575XMQAACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&cd=8&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=575XMQAACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Javascript.html?hl=&id=575XMQAACAAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=575XMQAACAAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "Added Benefits of owning this book: Gain a better grasp of efficient and effective JavaScript code to achieve programming success Speed up your programming abilities by avoiding time-wasting mistakes Gain the most important Best Practice ..."
            }
        },
        {
            "kind": "books#volume",
            "id": "-6xPCwAAQBAJ",
            "etag": "I6OQNG2GXpU",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/-6xPCwAAQBAJ",
            "volumeInfo": {
                "title": "Full Stack JavaScript",
                "subtitle": "Learn Backbone.js, Node.js and MongoDB",
                "authors": [
                    "Azat Mardan"
                ],
                "publisher": "Apress",
                "publishedDate": "2015-12-30",
                "description": "This is a hands-on book which introduces you to agile JavaScript web and mobile software development using the latest cutting-edge front-end and back-end technologies including: Node.js, MongoDB, Backbone.js, Parse.com, Heroku and Windows Azure. Practical examples include building multiple versions of the Chat app:•jQuery + Parse.com JS REST API•Backbone and Parse.com JS SDK•Backbone and Node.js•Backbone and Node.js + MongoDB The Chat application has all the foundation of a typical web/mobile application: fetching data, displaying it, submitting new data. Other examples in the book are as follows:•jQuery + Twitter RESP API “Tweet Analyzer”•Parse.com “Save John”•MongoDB “Print Collections”•Backbone.js “Apple Database”•Monk + Express.js “REST API Server” This book will save you many hours by providing a hand-picked and tested collection of quick start guides. RPJS has practical examples that allow to spend less time learning and more time building your own applications. Prototype fast and ship code that matters! What You will Learn: You should expect a basic understanding from a collection of quick start guides, tutorials and suggestions for the devel0pment apps discussed in this book. In addition to coding examples, the book covers virtually all setup and deployment step-by-step. You’ll learn from the examples of Chat web/mobile applications starting with front-end components and by the end we’ll put front-end and back-end together and deploy to the production environment. Who This Book is For: The typical programmer who wants to learn more about effective JavaScript coding.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9781484217511"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "1484217519"
                    }
                ],
                "readingModes": {
                    "text": true,
                    "image": true
                },
                "pageCount": 196,
                "printType": "BOOK",
                "categories": [
                    "Computers"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "1.5.3.0.preview.3",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=-6xPCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=-6xPCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=-6xPCwAAQBAJ&printsec=frontcover&dq=effective+javascript&hl=&as_pt=BOOKS&cd=9&source=gbs_api",
                "infoLink": "https://play.google.com/store/books/details?id=-6xPCwAAQBAJ&source=gbs_api",
                "canonicalVolumeLink": "https://market.android.com/details?id=book--6xPCwAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "FOR_SALE",
                "isEbook": true,
                "listPrice": {
                    "amount": 129.0,
                    "currencyCode": "ILS"
                },
                "retailPrice": {
                    "amount": 129.0,
                    "currencyCode": "ILS"
                },
                "buyLink": "https://play.google.com/store/books/details?id=-6xPCwAAQBAJ&rdid=book--6xPCwAAQBAJ&rdot=1&source=gbs_api",
                "offers": [
                    {
                        "finskyOfferType": 1,
                        "listPrice": {
                            "amountInMicros": 1.29E8,
                            "currencyCode": "ILS"
                        },
                        "retailPrice": {
                            "amountInMicros": 1.29E8,
                            "currencyCode": "ILS"
                        }
                    }
                ]
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/Full_Stack_JavaScript-sample-epub.acsm?id=-6xPCwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/Full_Stack_JavaScript-sample-pdf.acsm?id=-6xPCwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=-6xPCwAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "This is a hands-on book which introduces you to agile JavaScript web and mobile software development using the latest cutting-edge front-end and back-end technologies including: Node.js, MongoDB, Backbone.js, Parse.com, Heroku and Windows ..."
            }
        },
        {
            "kind": "books#volume",
            "id": "AgNVAgAAQBAJ",
            "etag": "V7dix6lpidM",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/AgNVAgAAQBAJ",
            "volumeInfo": {
                "title": "Effective Awk Programming",
                "subtitle": "Text Processing and Pattern Matching",
                "authors": [
                    "Arnold Robbins"
                ],
                "publisher": "\"O'Reilly Media, Inc.\"",
                "publishedDate": "2001-05-23",
                "description": "Effective awk Programming,3rd Edition, focuses entirely onawk, exploring it in the greatest depth of the three awk titles we carry. It's an excellent companion piece to the more broadly focused second edition.This book provides complete coverage of the gawk 3.1 language as well as the most up-to-date coverage of the POSIX standard forawk available anywhere. Author Arnold Robbins clearly distinguishes standard awk features from GNU awk(gawk)-specific features, shines light into many of the \"dark corners\" of the language (areas to watch out for when programming), and devotes two full chapters to example programs. A brand new chapter is devoted to TCP/IP networking with gawk. He includes a summary of how the awk language evolved.The book also covers: Internationalization of gawk Interfacing to i18n at the awk level Two-way pipes TCP/IP networking via the two-way pipe interface The new PROCINFO array, which provides information about running gawk Profiling and pretty-printing awk programs In addition to covering the awk language, this book serves as the official \"User's Guide\" for the GNU implementation of awk (gawk), describing in an integrated fashion the extensions available to the System V Release 4 version of awk that are also available in gawk.As the official gawk User's Guide, this book will also be available electronically, and can be freely copied and distributed under the terms of the Free Software Foundation's Free Documentation License (FDL). A portion of the proceeds from sales of this book will go to the Free Software Foundation to support further development of free and open source software.The third edition of Effective awk Programming is a GNU Manual and is published by O'Reilly & Associates under the Free Software Foundation's Free Documentation License (FDL). A portion of the proceeds from the sale of this book is donated to the Free Software Foundation to further development of GNU software. This book is also available in electronic form; you have the freedom to modify this GNU Manual, like GNU software. Copies published by the Free Software Foundation raise funds for GNU development.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9780596805371"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "0596805373"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 450,
                "printType": "BOOK",
                "categories": [
                    "Computers"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=AgNVAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=AgNVAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=AgNVAgAAQBAJ&pg=PA317&dq=effective+javascript&hl=&as_pt=BOOKS&cd=10&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=AgNVAgAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Effective_Awk_Programming.html?hl=&id=AgNVAgAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=AgNVAgAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "But there is one more subtlety in the \u003cb\u003eJavaScript\u003c/b\u003e code. Each time the \u003cb\u003eJavaScript\u003c/b\u003e \u003cbr\u003e\ncode opens a window for the image, the name of the image is appended with a \u003cbr\u003e\ntimestamp (systime). Why this constant change of name for the image? Initially, \u003cbr\u003e\nwe&nbsp;..."
            }
        }
    ]
}