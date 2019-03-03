import utilService from '../../../services/util.service.js';
import storageService from '../../../services/storage.service.js';

export default {
    query,
    getEmailById,
    getUnreadEmails,
    addEmail,
    saveEmailToDraft,
    deleteEmail,
    modifyEmail,
    modifyChecked
};

const EMAILS_KEY = 'localEmails';

var emailsDB;

_createEmails();

function query() {
    return Promise.resolve(emailsDB);
}

function getEmailById(id) {
    let email = emailsDB.find(email => email.id === id);
    if (email) return Promise.resolve(email);
    else return Promise.reject('Error: Email was not found.');
}

function getUnreadEmails() {
    return Promise.resolve(emailsDB.filter(email => !email.isRead && !email.isDeleted && !email.isDraft && !email.isSent).length);
}

function addEmail(data) {
    if (data.id) {
        return sendDraftEmail(data);
    }
    let {sender, recipient, subject, body} = data;
    emailsDB.unshift(_createEmail(sender, recipient, subject, body));
    storageService.saveToLocal(EMAILS_KEY, emailsDB);
    return Promise.resolve(`E-Mail was successfully sent to ${recipient}.`);
}

function sendDraftEmail(data) {
    let idx = _getEmailIdxById(data.id);
    if (idx === -1) return Promise.reject('Error: Email was not found, draft email required');
    emailsDB.splice(idx, 1);
    let {sender, recipient, subject, body} = data;
    let newEmail = _createEmail(sender, recipient, subject, body);
    newEmail.isSent = true;
    emailsDB.unshift(newEmail);
    storageService.saveToLocal(EMAILS_KEY, emailsDB);
    return Promise.resolve(`Email was successfully sent to ${recipient}.`);
}

function saveEmailToDraft(draftData) {
    let {sender, recipient, subject, body} = draftData;
    let newEmail = _createEmail(sender, recipient, subject, body);
    newEmail.isDraft = true;
    newEmail.isRead = true;
    emailsDB.unshift(newEmail);
    storageService.saveToLocal(EMAILS_KEY, emailsDB);
    return Promise.resolve(`Draft was saved.`);
}

function deleteEmail(id) {
    let idx = _getEmailIdxById(id);
    if (idx === -1) return Promise.reject('Failed to delete e-mail.')
    emailsDB.splice(idx, 1);
    storageService.saveToLocal(EMAILS_KEY, emailsDB);
    return Promise.resolve('E-Mail was successfully deleted.');
}

function modifyEmail(modifiedEmail) {    
    let idx = _getEmailIdxById(modifiedEmail.id);
    if (idx !== -1) {
        emailsDB.splice(idx, 1, modifiedEmail);
        storageService.saveToLocal(EMAILS_KEY, emailsDB);
        return Promise.resolve('Email was saved as a draft.');
    }
    return Promise.reject('Error: Email not found');
}

function modifyChecked(action) {
    if (!action) Promise.reject('Error: no action has been selected.');
    let prmsStr = '';
    if (action === 'delete') {
        let emailsToDelete = [];
        emailsDB.forEach(email => {
            if (email.isChecked) {
                if (email.isDeleted) {
                    emailsToDelete.push(email);
                } else {
                    email.isChecked = false;
                    email.isSent = false;
                    email.isDraft = false;
                    email.isDeleted = true;
                    prmsStr = 'E-mail was moved to trash inbox.';
                }
            }
        });
        if (emailsToDelete.length) {
            emailsToDelete.forEach(email => deleteEmail(email.id));
            prmsStr = 'Selected E-mails were permanently deleted.';
        }
    } else {
        emailsDB.forEach(email => {
            if (action === 'unread' && email.isChecked) {
                email.isRead = false;
                prmsStr = 'Selected E-mails were marked as unread.';
            } else if (action === 'read' && email.isChecked) {
                email.isRead = true;
                prmsStr = 'Selected E-mails were marked as read.';
            }
            email.isChecked = false;
        });
        storageService.saveToLocal(EMAILS_KEY, emailsDB);
    }
    prmsStr = (prmsStr)? prmsStr : 'Email was successfully modified.';
    return Promise.resolve(prmsStr);
}

function _getEmailIdxById(id) {
    return emailsDB.findIndex(email => email.id === id);
}

function _createEmails() {
    let emails = storageService.loadFromLocal(EMAILS_KEY);
    if (!emails) {
        emails = _premadeData();
    }
    emailsDB = emails;
}

function _createEmail(sender = 'Adi B.', recipient = 'Simon I.', subject = '', body = '') {
    return {
        id: utilService.generateId(),
        sender: sender,
        recipient: recipient,
        subject: subject,
        body: body,
        isRead: false,
        isChecked: false,
        isDeleted: false,
        isDraft: false,
        isSent: false,
        sentAt: Date.now(),
    }
}


// DUMMY DATA SECTION
function _premadeData() {
    let emails = [];
        for (let i = 0; i < 20; i++) {
            let newEmail = _createEmail();
            newEmail.isRead = true;
            newEmail.recipient = utilService.generateEmail();
            emails.unshift(newEmail);
        }

        emails[0].sentAt = Date.now();
        emails[0].sender = 'Albert E.'
        emails[0].subject = 'A human being is a part of the whole called by us universe, a part limited in time and space';
        emails[0].body = 'He experiences himself, his thoughts and feeling as something separated from the rest, a kind of optical delusion of his consciousness. This delusion is a kind of prison for us, restricting us to our personal desires and to affection for a few persons nearest to us. Our task must be to free ourselves from this prison by widening our circle of compassion to embrace all living creatures and the whole of nature in its beauty.';

        emails[1].sentAt = Date.now() - 1000 * 60 * 60 * 24;
        emails[1].isRead = false;
        emails[1].sender = 'Tolkien J.'
        emails[1].subject = 'Fantasy is escapist, and that is its glory';
        emails[1].body = `If a soldier is imprisioned by the enemy, don't we consider it his duty to escape?. . .If we value the freedom of mind and soul, if we're partisans of liberty, then it's our plain duty to escape, and to take as many people with us as we can!`;

        emails[2].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 3;
        emails[2].sender = 'Chuang T.';
        emails[2].subject = 'The fish trap exists because of the fish';
        emails[2].body = `Once you've gotten the fish you can forget the trap. The rabbit snare exists because of the rabbit. Once you've gotten the rabbit, you can forget the snare. Words exist because of meaning. Once you've gotten the meaning, you can forget the words. Where can I find a man who has forgotten words so I can talk with him?`;

        emails[3].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 4;
        emails[3].isRead = false;
        emails[3].sender = 'Ruskin B.';
        emails[3].subject = `love is undying,of that I feel certain`;
        emails[3].body = `I mean deep,abiding,cherishing love.The love that gives protection even as you,my guardian angel,gave me protection long after you had gone-and continue to give this very day... A love beyond Death-a love that makes Life alive!`;

        emails[4].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 7;
        emails[4].isRead = false;
        emails[4].sender = 'Robert L.';
        emails[4].subject = `if I could believe in the immortality business, the world would indeed be too good to be true`;
        emails[4].body = `we were put here to do what service we can, for honour and not for hire; the sods cover us, and the worm that never dies, the conscience, sleeps well at last; these are the wages, besides what we receive so lavishly day by day; and they are enough for a man who knows his own frailty and sees all things in the proportion of reality. The soul of piety was killed long ago by that idea of reward.... [M]an's cherished belief is that he loves that happiness which he continually spurns and passes by; and this belief in some ulterior happiness exactly fits him. He does not require to stop and taste it; he can be about the rugged and bitter business where his heart lies; and yet he can tell himself this fairy tale of an eternal tea-party, and enjoy the notion that he is both himself and something else; and that his friends will yet meet him, all ironed out and emasculate, and still be lovable—as if love did not live in the faults of the beloved only, and draw its breath in an unbroken round of forgiveness.`;

        emails[5].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 7;
        emails[5].sender = 'Sylvia P';
        emails[5].subject = `I can never read all the books I want`;
        emails[5].body = `I can never be all the people I want and live all the lives I want. I can never train myself in all the skills I want. And why do I want? I want to live and feel all the shades, tones and variations of mental and physical experience possible in my life. And I am horribly limited.`;

        emails[6].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 13;
        emails[6].isRead = false;
        emails[6].sender = 'Salinger J.';
        emails[6].subject = 'What really knocks me out is a book that';
        emails[6].body = `when you're all done reading it, you wish the author that wrote it was a terrific friend of yours and you could call him up on the phone whenever you felt like it. That doesn't happen much, though.`;

        emails[7].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 14;
        emails[7].sender = 'André G.';
        emails[7].subject = `It is better to be hated for what you are than to be loved for what you are not`;
        emails[7].body = `We invest less in our friendships and expect more of friends than any other relationship. We spend days working out where to book for a romantic dinner, weeks wondering how to celebrate a partner or parent's birthday, and seconds forgetting a friend's important anniversary.`;

        emails[8].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 14;
        emails[8].sender = 'Nnedi O.';
        emails[8].subject = `I love books, I adore everything about them`;
        emails[8].body= `I love the feel of the pages on my fingertips. They are light enough to carry, yet so heavy with worlds and ideas. I love the sound of the pages flicking against my fingers. Print against fingerprints. Books make people quiet, yet they are so loud.`;

        emails[9].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 15;
        emails[9].sender = 'Nick H.';
        emails[9].subject = `People go on about places like Starbucks being unpersonal and all that, but what if that's what you want?`;
        emails[9].body = `I'd be lost if people like that got their way and there was nothing unpersonal in the world. I like to know that there are big places without windows where no one gives a shit. You need confidence to go into small places with regular customers... I'm happiest in the Virgin Megastore and Borders and Starbucks and Pizza Express, where no one gives a shit and no one knows who you are. My mum & dad are always going on about how soulless those places are, and I'm like Der. That's the point.`;

        emails[10].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 16;
        emails[10].isRead = false;
        emails[10].sender = 'Oksana R.';
        emails[10].subject = 'Just take my hand, lead, dance with me';
        emails[10].body = `I will simply follow the blueness of the water, the white waves rolling free...where the earth beneath my feet and stars make my heart whole again...in long and priceless moments of shared solitude.`;

        emails[11].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 31;
        emails[11].sender = 'Anthony L.';
        emails[11].subject = `Sometimes I wonder`;
        emails[11].body = `that one missing sock after doing laundry, is the smart one. After being unhappy for so long, it finally walks away from a frayed, worn-out relationship.`;

        emails[12].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 40;
        emails[12].sender = 'Norman R.';
        emails[12].subject = `No matter how short or long your journey to your accomplishment is`;
        emails[12].body = `if you don't begin you can't get there. Beginning is difficult, but unavoidable!`;

        emails[13].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 30 * 7;
        emails[13].sender = 'Chris E.';
        emails[13].subject = `This was true, she knew`;
        emails[13].body = `Being involved with him gave her the privileged position of knowing him intimately. There were nights when he would wake up sweating, the nightmares returning out of the blue after a peaceful period sometimes weeks long. Growing up in the middle of a fierce civil war could indelibly mark a child. To Mykl, birthdays were always just another year under the belt, where the only reason to celebrate was that you weren’t dead yet. She took his hand, squeezed it tight and led him inside.`;

        emails[14].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 30 * 12;
        emails[14].sender = 'Orhan P.';
        emails[14].subject = `I will not swear, reader, that there was not something of repressed sarcasm`;
        emails[14].body = `I had silently feared St. John till now, because I had not understood him. He had held me in awe, because he had held me in doubt. How much of him was saint, how much mortal, I cold not heretofore tell: but revelations were being made in this conference: analysis of his nature was proceeding before my eyes. I saw his fallibilities: I.comprehnded them. I understood that, sitting there where I did, on the bank of heath, and with that handsome form before me, I sat at the feet of a man, erring as I. The veil fell from his hardness and despotism. Having felt in him the presence of these qualities, I felt his imperfection, and took courage. I was with an equal-one with whom I might argue-one whom, if I saw good, I might resist.`;

        emails[15].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 30 * 14;
        emails[15].sender = 'Richie N.';
        emails[15].subject = 'Life will last as long, as long as we enjoy it';
        emails[15].body = `There were nights when he would wake up sweating, the nightmares returning out of the blue after a peaceful period sometimes weeks long. Growing up in the middle of a fierce civil war could indelibly mark a child. To Mykl, birthdays were always just another year under the belt, where the only reason to celebrate was that you weren’t dead yet. She took his hand, squeezed it tight and led him inside.`;

        // sent: 
        emails[16].sentAt = Date.now();
        emails[16].isSent = true;
        emails[16].sender = 'Tessa A.';
        emails[16].subject =  `when you drive home today, you've got a big windshield`;
        emails[16].body = `And you've got a little bitty rearview mirror. And the reason the windshield is so large and the rearview mirror is so small is because what's happened in your past is not near as important as what's in your future.`;

        // drafts :
        emails[17].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 31;
        emails[17].isDraft = true;
        emails[17].sender = 'Anthony L.';
        emails[17].subject =  `In this life, we have to make many choices. Some are very important choices`;
        emails[17].body = `Some are not. Many of our choices are between good and evil. The choices we make, however, determine to a large extent our happiness or our unhappiness, because we have to live with the consequences of our choices.`;

        // trash :
        emails[18].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 30 * 12;
        emails[18].isRead = false;
        emails[18].isDeleted = true;
        emails[18].sender = 'James E.';
        emails[18].subject = `So to all Americans, in every city near and far`;
        emails[18].body = `You will never be ignored again. Your voice, your hopes, and your dreams will define our American destiny. And your courage and goodness and love will forever guide us along the way.`;

        emails[19].sentAt = Date.now() - 1000 * 60 * 60 * 23 * 22 * 13;
        emails[19].isDeleted = true;
        emails[19].sender = 'Gary Z.';
        emails[19].subject = `At the Summer Solstice`;
        emails[19].body = `All is green and growing, potential coming into being, the miracle of manifestation painted large on the canvas of awareness. At the Winter Solstice, the wind is cold, trees are bare and all lies in stillness beneath blankets of snow.`;

        storageService.saveToLocal(EMAILS_KEY, emails);
        return emails;
}