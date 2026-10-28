export interface ReasonItem {
  id: number;
  numberLabel: string;
  text: string;
  balloonColor: string;
}

export interface PolaroidItem {
  id: string;
  imageUrl: string;
  caption: string;
  date?: string;
  rotation?: number;
  isHeartShape?: boolean;
}

export interface GiftConfig {
  recipientName: string;
  age: number | string;
  senderName: string;
  coverKicker: string;
  coverSubtext: string;
  cakeTitle: string;
  cakeSubtitle: string;
  reasonsTitle: string;
  reasonsSubtitle: string;
  reasons: ReasonItem[];
  memoryTitle: string;
  memorySubtitle: string;
  polaroids: PolaroidItem[];
  letterRecipient: string;
  letterBody: string;
  letterSignoff: string;
  letterSender: string;
  letterStampInitial: string;
  videoUrl?: string;
  theme: 'midnight-sparkle' | 'rose-romance' | 'champagne-gold';
}

export enum GiftStage {
  COVER = 0,
  CAKE = 1,
  BALLOONS = 2,
  MEMORIES = 3,
  LETTER = 4,
  FINALE = 5,
}

export const DEFAULT_GIFT_CONFIG: GiftConfig = {
  recipientName: 'Kishmish',
  age: 20,
  senderName: 'Shubham Jha',
  coverKicker: "it's officially your day",
  coverSubtext: "a little world made with endless love just for you ✨",
  cakeTitle: 'Make a wish, Kishmish 🎂',
  cakeSubtitle: 'Blowing out candles with your Shubham...',
  reasonsTitle: 'Pop the balloons 🎈',
  reasonsSubtitle: "4 balloons. Each one holds why you mean everything to me, Kishmish. Pop them all",
  reasons: [
    {
      id: 1,
      numberLabel: 'REASON NO. 1',
      text: 'Your laugh is my absolute favourite melody in the whole universe 💖',
      balloonColor: '#FF6B8B', // vibrant pink
    },
    {
      id: 2,
      numberLabel: 'REASON NO. 2',
      text: "You believed in me and stood by me through every high and low 🌟",
      balloonColor: '#9D7BFF', // dreamy purple
    },
    {
      id: 3,
      numberLabel: 'REASON NO. 3',
      text: 'You bring the sweetest sunshine and peace into my world, my Kishmish 🍯',
      balloonColor: '#4DE1C1', // aqua mint
    },
    {
      id: 4,
      numberLabel: 'REASON NO. 4',
      text: 'With you in my life, every day feels like a blessing and my forever home 🏠',
      balloonColor: '#FFA07A', // coral peach
    },
  ],
  memoryTitle: 'A walk down memory lane',
  memorySubtitle: 'moments with you, my Kishmish, worth keeping forever 📷',
  polaroids: [
    {
      id: 'p1',
      imageUrl: '/memories/memory-1.jpg',
      caption: 'In your arms, my world finds complete peace. You are my safest home, Kishmish 🫂❤️',
      date: 'Pure Peace',
      rotation: -2.5,
    },
    {
      id: 'p2',
      imageUrl: '/memories/memory-2.jpg',
      caption: 'Whenever our eyes meet, my heart whispers that I’m the luckiest person alive ✨',
      date: 'You & Me Forever',
      rotation: 2,
      isHeartShape: true,
    },
    {
      id: 'p3',
      imageUrl: '/memories/memory-3.jpg',
      caption: 'I could spend an entire lifetime just looking at you and listening to you smile 💫',
      date: 'My Favourite View',
      rotation: -1.5,
    },
    {
      id: 'p4',
      imageUrl: '/memories/memory-4.jpg',
      caption: 'My best friend, my soulmate, and the cutest troublemaker in the universe 🥰',
      date: 'Unfiltered Joy',
      rotation: 2.5,
    },
    {
      id: 'p5',
      imageUrl: '/memories/memory-5.jpg',
      caption: 'Every blossom you placed in my hair brought a blooming love in my heart 🌸',
      date: 'Sweetest Memories',
      rotation: -2,
    },
    {
      id: 'p6',
      imageUrl: '/memories/memory-6.jpg',
      caption: 'No matter where life takes us, I will always be completely yours, my Kishmish 💖',
      date: 'Forever Yours',
      rotation: 1.5,
    },
  ],
  letterRecipient: 'Annesha (My Sweet Kishmish)',
  letterBody:
    'Today is your special day, my sweet Kishmish, and my only wish is to make it truly unforgettable for you. Leave behind every worry, doubt, or shadow of the past — because I am right here by your side.\n\nI am your present, and I promise to be your future, holding your hand through every chapter of our lives. You bring so much sweetness, warmth, and light into my world. Smile your prettiest smile, dream your biggest dreams, and enjoy every single second of your birthday.\n\nYou deserve all the happiness this world has to offer, today and forever.',
  letterSignoff: 'Forever and always yours,',
  letterSender: 'Shubham Jha',
  letterStampInitial: 'A',
  theme: 'midnight-sparkle',
};
