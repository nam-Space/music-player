const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const player = $('.player')
const cd = $('.cd');
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const positiveNum = $('.positive-num')
const negativeNum = $('.negative-num')
const progress = $('#progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "Từ Thích Thích Thành Thương Thương",
            singer: "AMEE, Hoàng Dũng",
            path: "./mp3/tu thich thich thanh thuong th... - AMEE Hoang Dung (NhacPro.net).flac",
            image: "https://static-images.vnncdn.net/files/publish/2022/5/27/hain7580-102.jpg",
            download: "https://data16.chiasenhac.com/downloads/2140/6/2139727-bf07185c/flac/tu thich thich thanh thuong th... - AMEE Hoang Dung (NhacPro.net).flac?time=1662806718"
        },
        {
            name: "BlackJack",
            singer: "Sobin Hoàng Sơn, Binz",
            path: "./mp3/BlackJack - Soobin_ Binz.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/4/0/5/6/40564f839b476fd66838e497796a3d5f.jpg",
            download: "http://www.nghenhactre.net/api/music/download/5bd8b1351bd1746bf556877b5b226d14/1607235536/mp3/Blackjack - Binz Soobin Hoàng Sơn.mp3",
        },
        {
            name: "Liếc Mắt Đưa Tình",
            singer: "K-ICM, Lena",
            path: "./mp3/Liec Mat Dua Tinh - K-ICM_ Lena.mp3",
            image:"https://linkhay.mediacdn.vn/storage/users/nhacdjvn/original/2020/12/01/224672.42XC05fc65dccb5efb.jpg",
            download: "http://www.nghenhactre.net/api/music/download/8693155920af4724b480b5c7fe9595b7/1607822916/mp3/Liếc Mắt Đưa Tình - K-ICM Lena.mp3"
        },
        {
            name: "Chạy Về Khóc Với Anh",
            singer: "Erik",
            path: "./mp3/Chay Ve Khoc Voi Anh - ERIK (NhacPro.net).flac",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/c/6/d/e/c6def069a1a885c41fe479358fa7c506.jpg",
            download: "https://data.chiasenhac.com/down2/2221/6/2220891-72ab7211/flac/Chay Ve Khoc Voi Anh - ERIK (NhacPro.net).flac?time=1662805179"
        },
        {
            name: "Chìm Sâu",
            singer: "MCK, Trung Trần",
            path: "./mp3/Chim Sau - MCK_ Trung Tran.mp3",
            image:
                "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/11/16/6/5/0/2/1605491409204_600.jpg",
            download: "https://data.chiasenhac.com/down2/2230/6/2229564-d379b916/flac/Chim Sau - MCK Trung Tran (NhacPro.net).flac?time=1662805423"
        },
        {
            name: "Có Hẹn Với Thanh Xuân",
            singer: "Monstar",
            path: "./mp3/Co Hen Voi Thanh Xuan - Monstar.mp3",
            image:
                "https://data.chiasenhac.com/data/cover/144/143191.jpg",
            download: "http://tainhacmienphihay.mobi/download-music/33255"
        },
        {
            name: "Sài Gòn Đau Lòng Quá",
            singer: "Hứa Kim Tuyền, Hoàng Duyên",
            path:
                "./mp3/Sai Gon Dau Long Qua - Hua Kim Tuyen Hoang Duyen (NhacPro.net).flac",
            image:
                "https://cdnmedia.thethaovanhoa.vn/Upload/qPf4BjfjvkrFearu8hrw/files/avatahuakimtuyen.jpg",
            download: "https://data.chiasenhac.com/down2/2162/6/2161930-9845d4d3/flac/Sai%20Gon%20Dau%20Long%20Qua%20-%20Hua%20Kim%20Tuyen%20Hoang%20Duyen%20(NhacPro.net).flac?time=1662805733"
        },
        {
            name: "Lemon Tree",
            singer: "DJ DESA",
            path: "./mp3/Lemon-Tree-Remix-Tiktok-DJ-DESA-Remix.mp3",
            image:
                "https://avatar-ex-swe.nixcdn.com/singer/avatar/2014/13/7E4149A9_1321_600.jpg",
            download: "https://nhactiktokhay.com/lemon-tree-remix-tiktok-dj-desa-remix.html?download=10468"
        },
        {
            name: "Shay Nắnggg",
            singer: "Amee, Obito",
            path: "./mp3/Shay Nanggg - AMee_ Obito.mp3",
            image:
                "https://dep.com.vn/wp-content/uploads/2022/06/5-4.png",
            download: "https://nhactiktokhay.com/shay-nanggg-amee-obito.html?download=14986"
        },
        {
            name: "There's No One At All",
            singer: "Sơn Tùng MTP",
            path: "./mp3/There_s No One At All - Son Tung M-TP.mp3",
            image: "https://media.yeah1.com/files/uploads/editors/68/2022/05/09/3wwcbzPK1FwsWYqyTVIHHvFQVD5Og4zX92FTYz40.jpg",
            download: "https://data.chiasenhac.com/down2/2242/6/2241378-b5c30814/flac/There s No One At All - Son Tung M TP (NhacPro.net).flac?time=1662807009"
        },
        {
            name: "You Don't Know Me",
            singer: "Ofenbach, Brodie Barclay",
            path: "./mp3/YouDontKnowMe-OfenbachBrodieBarclay-4396475.mp3",
            image:
              "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/3/a/f/7/3af7f320df86e0f6b76caf147b499cc4.jpg",
            download: "https://data3.chiasenhac.com/downloads/2114/6/2113489-a10deafe/flac/You Don t Know Me - Ofenbach Brodie Barclay (NhacPro.net).flac?time=1662807185"
        },
        {
            name: "Có Em Chờ",
            singer: "MIN, Mr A",
            path: "./mp3/Co Em Cho - MIN Mr A (NhacPro.net).flac",
            image: "https://afamilycdn.com/150157425591193600/2020/10/30/min-160407578725129366232.jpg",
            download: "https://data3.chiasenhac.com/downloads/1785/6/1784766-10c3bf6b/flac/Co Em Cho - MIN Mr A (NhacPro.net).flac?time=1662807286"
        },
        {
            name: "Anh Đánh Rơi Người Yêu Này",
            singer: "Andiez, AMEE",
            path: "./mp3/Anh Danh Roi Nguoi Yeu Nay.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/0/8/c/308c5809bbfa86de59709090245b9819.jpg",
            download: "https://tainhacmoinhat.com/download-mp3/CxqqbaPjwJsI/mp3"
        },
        {
            name: "BAAM",
            singer: "Momoland",
            path: "./mp3/Baam - Momoland.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/0/e/a/30ea3cc46512569d3abdaf9e50daddd4.jpg",
            download: "https://data35.chiasenhac.com/downloads/1962/6/1961410-c1c4c396/320/Baam%20-%20Momoland.mp3"
        }
    ],
    setConfig(key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                        <div class="menu-song">
                            <div class="next-song">
                                <i class="fa-solid fa-circle-play"></i>
                                <p class="next-song-desc">Phát tiếp theo</p>
                            </div>
                            <a class="download" download="${song.name}" href="${song.download}">
                                <i class="fa-solid fa-download"></i>
                                <p class="download-desc">Tải xuống</p>
                            </a>
                        </div>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents() {
        const _this = this
        const cdWidth = cd.offsetWidth

        // Xử lý khi bật modal lên mà kick sang bên ngoài (click sang các nút, hoặc sang bên ngoài...)
        $('.dashboard').onclick = function() {
            const modalList = $$('.menu-song');
            Array.from(modalList).forEach(modal => {
                if (modal.matches('.active-modal')) {
                    modal.classList.remove('active-modal')
                }
            })
        }

        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })

        cdThumbAnimate.pause()

        // Xử lý phóng to / thu nhỏ
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newWidth = cdWidth - scrollTop

            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
            cd.style.opacity = newWidth / cdWidth
        }

        // Xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }

        }

        // Khi song được play
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing')
            cdThumbAnimate.play()
            
        }

        // Khi song được pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            const progressPercent = Math.ceil(audio.currentTime / audio.duration * 100)
            if (progressPercent) {
                progress.value = progressPercent
            }
            
            const positiveMinute = Math.floor(audio.currentTime / 60);
            const positiveSecond = Math.floor(audio.currentTime - positiveMinute * 60);
            if (positiveSecond < 10) {
                positiveNum.innerText = positiveMinute + ':0' + positiveSecond;
            } else {
                positiveNum.innerText = positiveMinute + ':' + positiveSecond;
            }

            if (audio.duration) {
                const negativeMinute = Math.floor(audio.duration / 60 - audio.currentTime / 60);
                const negativeSecond = Math.floor(audio.duration - negativeMinute * 60 - audio.currentTime);
                if (negativeSecond < 10) {
                    negativeNum.innerText = "-" + negativeMinute + ":0" + negativeSecond
                } else {
                    negativeNum.innerText = "-" + negativeMinute + ":" + negativeSecond
                }
            }

        }

        // Xử lý tua song
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;

        }

        // Khi next song
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()

        }

        // Khi prev song
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()

        }

        // Khi xử lý bật / tắt random song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)

        }

        // Xử lý lặp lại 1 song
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)

        }

        // Xử lý next song khi audio ended
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // Lắng nghe hành vi click
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')

            // Xử lý khi click vào song
            if (songNode && !e.target.closest('.option')) {
                // Xử lý khi click vào song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render()
                    audio.play()
        
                }
            }

            // Xử lý khi click vào mục option
            if (e.target.closest('.option')) {
                let option = e.target.parentElement;
                if (!option.matches('.option')) {
                    option = e.target;
                } 

                const menu = option.querySelector('.menu-song');
                if (!menu.matches('.active-modal')) {
                    $('.dashboard').click()
                    menu.classList.add('active-modal')
                    
                } else {
                    menu.classList.remove('active-modal')
                }

                // Khi xử lý vào phát bài tiếp theo
                const continueSong = option.querySelector('.next-song')
                continueSong.onclick = function () {
                    var id = Number(option.parentElement.getAttribute('data-index'))
                    _this.currentIndex = id - 1;
                    $('.dashboard').click()
                }

                // Khi xử lý vào tải bài hát
                const downloadBtn = option.querySelector('.download')
                downloadBtn.onclick = function() {
                    $('.dashboard').click()
                }
            }
        }
    },
    scrollToActiveSong() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        }, 300)
    },
    loadCurrentSong() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
        audio.autoplay = true;
    },
    loadConfig() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },
    prevSong() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong()
    },
    playRandomSong() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (this.currentIndex === newIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong()
    },
    start() {
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig()

        // Định nghĩa các thuộc tính cho object
        this.defineProperties()

        // Lắng nghe / sử lý các sự kiện (event)
        this.handleEvents()

        // Tải thông tin bài hát đầu tiên
        this.loadCurrentSong()

        // Render playlist
        this.render()

        randomBtn.classList.toggle('active',this.isRandom)
        repeatBtn.classList.toggle('active',this.isRepeat)
    }
}

app.start()