'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Stories', [
      {
        imageUrl: 'https://images.unsplash.com/photo-1599572739984-8ae9388f23b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 1,
        title: 'My cat played with leaves outside',
        body: 'Lectus sit amet est placerat in. Egestas purus viverra accumsan in nisl nisi scelerisque eu. At consectetur lorem donec massa. Neque ornare aenean euismod elementum nisi quis eleifend. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. A iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Commodo nulla facilisi nullam vehicula ipsum. Eu mi bibendum neque egestas congue quisque. Odio eu feugiat pretium nibh ipsum consequat. Et malesuada fames ac turpis egestas integer eget. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1585937250791-efc81fc76e43?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 2,
        title: 'My cat watched me play Overwatch on my gaming pc',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae elementum curabitur. Vulputate sapien nec sagittis aliquam. Semper quis lectus nulla at. Sed lectus vestibulum mattis ullamcorper. Sed tempus urna et pharetra. Viverra ipsum nunc aliquet bibendum enim. Nibh tellus molestie nunc non. Purus ut faucibus pulvinar elementum integer enim. Malesuada nunc vel risus commodo viverra maecenas. Sed blandit libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus interdum.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1488015795646-7e22a773d72a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 3,
        title: 'My cat got very sleepy and took a nap on the sofa',
        body: 'Ultrices dui sapien eget mi proin sed libero enim sed. Leo vel orci porta non. Risus nullam eget felis eget nunc lobortis. Nunc sed augue lacus viverra vitae congue. Non tellus orci ac auctor augue mauris augue neque gravida. Erat pellentesque adipiscing commodo elit at imperdiet. Diam maecenas sed enim ut sem viverra aliquet eget sit. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Nisl pretium fusce id velit ut tortor pretium. Quisque id diam vel quam elementum. Odio ut sem nulla pharetra diam sit amet. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1567569548808-ccc1eca20644?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 4,
        title: 'My cat got angry for tricking her into going to the vet...  Sorry.',
        body: 'Etiam erat velit scelerisque in dictum non consectetur. Senectus et netus et malesuada fames ac turpis egestas integer. Suspendisse faucibus interdum posuere lorem. At auctor urna nunc id cursus metus aliquam eleifend mi. Lorem sed risus ultricies tristique nulla aliquet enim tortor at. Ultrices neque ornare aenean euismod elementum nisi quis. Lacus viverra vitae congue eu consequat ac felis donec et. Semper auctor neque vitae tempus quam pellentesque nec. Felis eget velit aliquet sagittis id. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Felis donec et odio pellentesque diam volutpat. Interdum velit laoreet id donec ultrices. Urna id volutpat lacus laoreet non curabitur gravida arcu ac. Volutpat ac tincidunt vitae semper. Lacus suspendisse faucibus interdum posuere lorem. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Quam id leo in vitae turpis.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1550782674-fa597ecc1bfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        authorId: 1,
        title: 'My cat loves being at the beach whenever I am at my beach home',
        body: 'Proin fermentum leo vel orci. Ornare quam viverra orci sagittis eu volutpat odio facilisis. At augue eget arcu dictum. Viverra suspendisse potenti nullam ac tortor. Lorem ipsum dolor sit amet consectetur adipiscing. Amet nisl purus in mollis nunc sed id semper. Orci dapibus ultrices in iaculis nunc. Gravida quis blandit turpis cursus. Dui sapien eget mi proin sed libero. Nibh sit amet commodo nulla facilisi nullam vehicula. Risus sed vulputate odio ut enim. Vestibulum morbi blandit cursus risus at ultrices.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1440342341486-63ffb908eb20?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 2,
        title: 'Just adopted this cat.  curious.  maybe wants to try coming out of the bedroom',
        body: 'Scelerisque eleifend donec pretium vulputate sapien nec. Scelerisque in dictum non consectetur a. Id interdum velit laoreet id. Commodo viverra maecenas accumsan lacus vel facilisis. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Tempor orci eu lobortis elementum nibh tellus molestie. Tincidunt augue interdum velit euismod in pellentesque. Sit amet volutpat consequat mauris. Neque volutpat ac tincidunt vitae semper quis lectus nulla. Magna ac placerat vestibulum lectus mauris ultrices eros in. Amet mattis vulputate enim nulla aliquet porttitor lacus. Felis donec et odio pellentesque. Id velit ut tortor pretium viverra. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1496285138399-b5d7d20d1e16?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 3,
        title: 'Just cleaned my bed sheets and covers.  Cat decided to sleep on the clean sheets while it was still warm',
        body: 'Massa massa ultricies mi quis hendrerit dolor magna eget est. Odio aenean sed adipiscing diam donec adipiscing tristique risus. Vitae turpis massa sed elementum tempus. Proin libero nunc consequat interdum varius. Quis risus sed vulputate odio ut. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Diam quam nulla porttitor massa. Egestas egestas fringilla phasellus faucibus scelerisque. Semper risus in hendrerit gravida rutrum. Euismod lacinia at quis risus sed vulputate odio ut. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. Bibendum enim facilisis gravida neque convallis a cras semper.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1517429481096-5bc77134f77c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        authorId: 4,
        title: 'My cat watched Netflix with me on my tiny iPhone',
        body: 'Ultrices in iaculis nunc sed augue lacus viverra. In fermentum posuere urna nec tincidunt praesent. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Sed lectus vestibulum mattis ullamcorper velit. At quis risus sed vulputate odio. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. Nunc vel risus commodo viverra maecenas accumsan lacus. Tortor aliquam nulla facilisi cras fermentum odio eu. At auctor urna nunc id cursus metus aliquam. Lacinia quis vel eros donec ac odio tempor orci. Dolor magna eget est lorem ipsum dolor sit. Rhoncus dolor purus non enim praesent elementum facilisis leo. Neque viverra justo nec ultrices dui sapien eget mi proin.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1575470887806-b77feadf85fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 1,
        title: 'My cat met a stray neighbor cat and made a new friend today',
        body: 'Dictum varius duis at consectetur lorem donec. Metus vulputate eu scelerisque felis. Sed vulputate mi sit amet. Amet aliquam id diam maecenas. Nam at lectus urna duis convallis convallis tellus id. Nunc vel risus commodo viverra maecenas accumsan. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Elit eget gravida cum sociis. Dictum fusce ut placerat orci nulla pellentesque dignissim. Ullamcorper sit amet risus nullam eget felis eget. Interdum varius sit amet mattis vulputate. Accumsan lacus vel facilisis volutpat est velit egestas dui id. Turpis cursus in hac habitasse platea dictumst quisque sagittis. Consequat interdum varius sit amet mattis vulputate enim. A lacus vestibulum sed arcu non. Id neque aliquam vestibulum morbi blandit cursus risus at ultrices.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1585920768861-e595e4bf7768?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        authorId: 2,
        title: 'My cat enjoys the warm house with fireplace, but still enjoys the watching people outside in the snow',
        body: 'Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Lobortis feugiat vivamus at augue eget arcu dictum varius. Eget mi proin sed libero enim sed faucibus turpis in. Ipsum dolor sit amet consectetur adipiscing elit duis tristique. Sed nisi lacus sed viverra tellus in hac habitasse. Vitae congue mauris rhoncus aenean vel elit. Adipiscing bibendum est ultricies integer quis auctor. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Mollis nunc sed id semper risus in hendrerit. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Gravida neque convallis a cras semper auctor neque. Arcu odio ut sem nulla pharetra diam. Tortor dignissim convallis aenean et tortor at. Diam quam nulla porttitor massa id. Amet est placerat in egestas erat imperdiet sed euismod nisi. Posuere ac ut consequat semper viverra.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1542108226-9130e1e83cc4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 3,
        title: 'It is Christmas, and my cat decided to play with the christmas tree decorations',
        body: 'Placerat orci nulla pellentesque dignissim enim sit amet. Ac odio tempor orci dapibus ultrices. Mattis pellentesque id nibh tortor id aliquet. Venenatis a condimentum vitae sapien pellentesque. Est velit egestas dui id ornare arcu odio. Dolor magna eget est lorem ipsum dolor sit amet consectetur. Nulla aliquet enim tortor at. Ultrices sagittis orci a scelerisque purus semper eget duis at. Ut eu sem integer vitae justo eget magna fermentum. Nec tincidunt praesent semper feugiat nibh. Amet mattis vulputate enim nulla aliquet.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 3,
        title: 'Just bought this cute sweater for my dog.  We love it.',
        body: 'Donec massa sapien faucibus et. Ac odio tempor orci dapibus ultrices in iaculis. At consectetur lorem donec massa. Ac feugiat sed lectus vestibulum mattis ullamcorper. Sed egestas egestas fringilla phasellus. Cras fermentum odio eu feugiat pretium nibh ipsum. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Quis auctor elit sed vulputate mi sit amet mauris commodo. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Mauris commodo quis imperdiet massa tincidunt. Non enim praesent elementum facilisis leo vel. Lacinia quis vel eros donec ac odio tempor orci dapibus. Nec nam aliquam sem et tortor consequat id porta nibh. Pellentesque sit amet porttitor eget dolor morbi non. Viverra maecenas accumsan lacus vel facilisis. Maecenas accumsan lacus vel facilisis volutpat est velit egestas dui. Imperdiet dui accumsan sit amet nulla facilisi. Curabitur gravida arcu ac tortor dignissim convallis aenean.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 1,
        title: 'Just moved into our first house that we bought.  Our puppy loves the front yard.',
        body: 'Aliquam etiam erat velit scelerisque in dictum non consectetur a. Tempus urna et pharetra pharetra massa. Senectus et netus et malesuada fames. Cum sociis natoque penatibus et magnis. Dolor morbi non arcu risus quis varius. Nisl pretium fusce id velit ut. Tellus in hac habitasse platea. Tortor posuere ac ut consequat semper. Venenatis lectus magna fringilla urna porttitor. Mauris pharetra et ultrices neque ornare aenean euismod. Nibh venenatis cras sed felis eget velit aliquet sagittis id. Volutpat est velit egestas dui id ornare arcu odio. Arcu non sodales neque sodales ut etiam. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet non. Ac felis donec et odio pellentesque. Suspendisse in est ante in nibh mauris cursus mattis. Purus in massa tempor nec feugiat nisl pretium fusce id. Turpis egestas integer eget aliquet nibh praesent. Placerat duis ultricies lacus sed turpis tincidunt id aliquet. Volutpat consequat mauris nunc congue.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 2,
        title: 'Our two dogs just love going on long walks together out in nature.',
        body: 'Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Tempor id eu nisl nunc mi ipsum. Sit amet cursus sit amet. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Nibh praesent tristique magna sit amet purus gravida quis. Quam adipiscing vitae proin sagittis nisl rhoncus. Vitae et leo duis ut diam. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Pellentesque id nibh tortor id aliquet lectus.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 3,
        title: 'My dog loves the beach.  He loves the fresh air blowing through his fur and splashing in the water',
        body: 'Quis blandit turpis cursus in hac. Ipsum dolor sit amet consectetur adipiscing elit. Id nibh tortor id aliquet lectus proin nibh nisl condimentum. Nunc mattis enim ut tellus elementum. Id aliquet lectus proin nibh. Maecenas sed enim ut sem viverra aliquet. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Turpis nunc eget lorem dolor sed. Donec et odio pellentesque diam volutpat commodo. Scelerisque fermentum dui faucibus in ornare. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Mus mauris vitae ultricies leo. Volutpat sed cras ornare arcu dui vivamus arcu. Enim ut sem viverra aliquet eget sit amet tellus. Nibh ipsum consequat nisl vel pretium lectus quam.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1489440543286-a69330151c0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        authorId: 1,
        title: 'Took my dog to visit "Little Grand Canyon" in Utah.  What an unforgettable experience!',
        body: 'Amet luctus venenatis lectus magna fringilla urna. Eu non diam phasellus vestibulum lorem sed risus ultricies. Imperdiet dui accumsan sit amet. Risus in hendrerit gravida rutrum quisque non. Fusce id velit ut tortor pretium. Tristique sollicitudin nibh sit amet. Tempor nec feugiat nisl pretium fusce id velit ut. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Odio eu feugiat pretium nibh ipsum consequat nisl vel pretium. Consequat mauris nunc congue nisi. Vitae ultricies leo integer malesuada nunc vel risus. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Iaculis urna id volutpat lacus laoreet non curabitur. Est sit amet facilisis magna etiam tempor orci.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1592924728350-f7d4fd5d1655?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 2,
        title: 'Just adopted this cute little puppy.  What should we name her?',
        body: 'Dignissim sodales ut eu sem. Cras ornare arcu dui vivamus. Nunc sed augue lacus viverra vitae congue. Fusce ut placerat orci nulla. Varius sit amet mattis vulputate enim. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Nunc congue nisi vitae suscipit tellus mauris a. Eget sit amet tellus cras adipiscing enim eu turpis egestas. Purus sit amet luctus venenatis lectus. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 3,
        title: 'Took my gorgeous white dog to Lake Louise in Canada.  He absolutely loved the clear water.',
        body: 'Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Metus dictum at tempor commodo ullamcorper a lacus. Donec et odio pellentesque diam volutpat commodo sed. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. In est ante in nibh mauris cursus mattis molestie. Blandit aliquam etiam erat velit scelerisque in dictum non. Eget arcu dictum varius duis. A pellentesque sit amet porttitor eget dolor. Pretium fusce id velit ut tortor pretium viverra. Et tortor at risus viverra adipiscing at in tellus. Congue quisque egestas diam in arcu. Eu volutpat odio facilisis mauris sit amet massa. Ipsum dolor sit amet consectetur adipiscing elit ut. Etiam tempor orci eu lobortis elementum nibh. Sed elementum tempus egestas sed sed risus pretium.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1578133507770-a35cc3c786e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        authorId: 1,
        title: 'My shiba inu looked so dashing at the park',
        body: 'Semper viverra nam libero justo laoreet sit amet cursus sit. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Nunc sed augue lacus viverra vitae congue eu. Donec massa sapien faucibus et molestie. Feugiat sed lectus vestibulum mattis ullamcorper velit. Neque sodales ut etiam sit amet nisl purus. Arcu cursus vitae congue mauris rhoncus aenean. Mollis nunc sed id semper risus in. Sit amet tellus cras adipiscing enim eu. Egestas dui id ornare arcu odio. Morbi tristique senectus et netus et malesuada fames. Massa eget egestas purus viverra accumsan in nisl. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Sit amet venenatis urna cursus eget. Eget arcu dictum varius duis. Maecenas pharetra convallis posuere morbi leo urna molestie. Laoreet sit amet cursus sit amet dictum.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1553776590-89774e24b34a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        authorId: 2,
        title: 'My little terrier was sad today because he misses grandma.  She passed away last night and the house feels empty.  At least I have my doggie. ',
        body: 'Eleifend quam adipiscing vitae proin. Sed viverra ipsum nunc aliquet bibendum. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Commodo elit at imperdiet dui accumsan. Scelerisque felis imperdiet proin fermentum leo vel. Accumsan lacus vel facilisis volutpat est. Nisl tincidunt eget nullam non. Volutpat blandit aliquam etiam erat velit scelerisque in dictum. Tortor id aliquet lectus proin nibh nisl. Erat velit scelerisque in dictum non consectetur. Id leo in vitae turpis massa sed.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  // down: async (queryInterface, Sequelize) => {
  //   /**
  //    * Add commands to revert seed here.
  //    *
  //    * Example:
  //    */
  //   await queryInterface.bulkDelete('Stories', null, {});
  // }

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Stories', null, { truncate: true, cascade: true, restartIdentity: true });
  }

};
