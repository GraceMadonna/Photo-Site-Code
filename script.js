var app = new Vue({
  el: '#app', // which element to grab

  data: {

    slidenum: -1,

    tab: "welcome",

    gallery : {
      coverImage : '',
      collectionName : '',
      model : '',
      date : '',
    },

    galleries : galleries

},
watch : {
  slidenum (v) {
    setTimeout(()=>{
    console.log('I see slidenum changing');
    if (v > -1) {
      console.log('grab me some focus');
      this.$refs.slide.focus();
    }
  },100);
  console.log('Count to one...');
  },
},
methods : {
  selectGallery (gallery) {
    this.tab = 'gallery';
    this.gallery = gallery;
  },

  imageBack () {
    this.slidenum -=1;
    if (this.slidenum < 0) {
      this.slidenum = this.gallery.images.length - 1;
    }
  },

  imageForward() {
    this.slidenum +=1;
    if (this.slidenum > this.gallery.images.length) {
        this.slidenum =0;
    }
  },

},

})
