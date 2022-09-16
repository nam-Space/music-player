const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'F8_PLAYER'
const HEART_STORAGE_KEY = 'HEART_STORAGE'

const dashboard = $('.dashboard');
const playlist = $('.playlist')
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
            download: "https://data3.chiasenhac.com/downloads/2138/5/2137812-dd9daf4b/320/Tu%20Thich%20Thich%20Thanh%20Thuong%20Thuong%20-%20AMe.mp3"
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
            download: "https://vnno-zn-5-tf-mp3-s1-zmp3.zmdcdn.me/baa2ed6e9d2f74712d3e/7034223956028953907?authen=exp=1663513150~acl=/baa2ed6e9d2f74712d3e/*~hmac=83f4957e3ab1fa1af5b7c2eaefb44f4c&fs=MTY2MzM0MDM1MDMyNHx3ZWJWNnwxMDIzODMxNTmUsIC2fDQyLjExMy4xNzMdUngODY&filename=Chay-Ve-Khoc-Voi-Anh-ERIK.mp3"
        },
        {
            name: "Chìm Sâu",
            singer: "MCK, Trung Trần",
            path: "./mp3/Chim Sau - MCK_ Trung Tran.mp3",
            image:
                "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/11/16/6/5/0/2/1605491409204_600.jpg",
            download: "https://data.chiasenhac.com/down2/2230/5/2229564-d379b916/320/Chim%20Sau%20-%20MCK_%20Trung%20Tran.mp3"
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
            download: "https://vnno-vn-5-tf-mp3-s1-zmp3.zmdcdn.me/23b37e7a243bcd65942a/6508579472578543996?authen=exp=1663513271~acl=/23b37e7a243bcd65942a/*~hmac=473f97a35448967f9180d174ccfb06da&fs=MTY2MzM0MDQ3MTmUsIC5OHx3ZWJWNnwxMDIzODMxNTmUsIC2fDQyLjExMy4xNzMdUngODY&filename=Sai-Gon-Dau-Long-Qua-Hua-Kim-Tuyen-Hoang-Duyen.mp3"
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
            download: "https://data.chiasenhac.com/down2/2242/5/2241378-b5c30814/320/There_s%20No%20One%20At%20All%20-%20Son%20Tung%20M-TP.mp3"
        },
        {
            name: "You Don't Know Me",
            singer: "Ofenbach, Brodie Barclay",
            path: "./mp3/YouDontKnowMe-OfenbachBrodieBarclay-4396475.mp3",
            image:
              "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/3/a/f/7/3af7f320df86e0f6b76caf147b499cc4.jpg",
              download: "https://data3.chiasenhac.com/downloads/2114/5/2113489-a10deafe/flac/You%20Don%20t%20Know%20Me%20-%20Ofenbach%20Brodie%20Barclay%20(NhacPro.net).flac?time=1663340673"
        },
        {
            name: "Có Em Chờ",
            singer: "MIN, Mr A",
            path: "./mp3/Co Em Cho - MIN Mr A (NhacPro.net).flac",
            image: "https://afamilycdn.com/150157425591193600/2020/10/30/min-160407578725129366232.jpg",
            download: "https://vnno-vn-6-tf-mp3-s1-zmp3.zmdcdn.me/3292444e9b0a72542b1b/6792228024536335773?authen=exp=1663513527~acl=/3292444e9b0a72542b1b/*~hmac=a1361fa46f9f9e85b39a1c870f3c373a&fs=MTY2MzM0MDmUsICyNzA5M3x3ZWJWNnwxMDIzODMxNTmUsIC2fDQyLjExMy4xNzMdUngODY&filename=Co-Em-Cho-MIN-Mr-A.mp3"
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
            download: "https://data35.chiasenhac.com/downloads/1962/5/1961410-c1c4c396/320/Baam%20-%20Momoland.mp3"
        },
        {
            name: "Tình Bạn Diệu Kỳ",
            singer: "AMee, Ricky Star, Lăng LD",
            path: "./mp3/Tinh ban dieu ky.mp3",
            image: "https://data.chiasenhac.com/data/cover/137/136473.jpg",
            download: "https://stream.nixcdn.com/NhacCuaTui1010/TinhBanDieuKy-AMeeRickyStarLangLD-6927558.mp3?st=UtTHhzvC0AWZzCVuyxshEA&e=1662620242&download=true"
        },
        {
            name: "Yêu Là Tha Thu",
            singer: "OnlyC",
            path: "./mp3/Yêu Là Tha Thu (Em Chưa 18 OST).mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2017/05/15/1/9/3/6/1494842845652_640.jpg",
            download: "https://nhactre.org/download-mp3/vmjlLAAxhof5/mp3"
        },
        {
            name: "Màu Nước Mắt",
            singer: "Nguyễn Trần Trung Quân",
            path: "./mp3/Mau Nuoc Mat - Nguyen Tran Trung Quan.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/8/f/5/0/8f50e5afbf4daa6d062019bc36f3ab1a.jpg",
            download: "https://vnno-vn-6-tf-mp3-s1-zmp3.zmdcdn.me/3e3d7732b87651280867/852000302350569841?authen=exp=1663513663~acl=/3e3d7732b87651280867/*~hmac=a2d61fa7cd7ef13a8497f0eaa4524a37&fs=MTY2MzM0MDg2MzU1NHx3ZWJWNnwxMDIzODMxNTmUsIC2fDQyLjExMy4xNzMdUngODY&filename=Mau-Nuoc-Mat-Beat-Nguyen-Tran-Trung-Quan.mp3"
        },
        {
            name: "Phía Sau Một Cô Gái",
            singer: "Soobin Hoàng Sơn",
            path: "./mp3/Phia Sau Mot Co Gai.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/c/b/cbe2dfb3d65dc97c68f983d09bff78a7_1476796126.jpg",
            download: "https://data01.chiasenhac.com/downloads/1730/5/1729694-a4afea05/flac/Phia%20Sau%20Mot%20Co%20Gai%20-%20Soobin%20Hoang%20Son%20(NhacPro.net).flac?time=1663341032"
        },
        {
            name: "Nơi Này Có Anh",
            singer: "Sơn Tùng M-TP",
            path: "./mp3/Noi Nay Co Anh - Son Tung M-TP.mp3",
            image: "https://www.remixviet.net/data/upload/noi-nay-co-anh.png",
            download: "https://data37.chiasenhac.com/downloads/1897/5/1896719-828a80eb/128/Noi%20Nay%20Co%20Anh%20-%20Son%20Tung%20M-TP.mp3"
        },
        {
            name: "Thằng Điên",
            singer: "Justatee, Phương Ly",
            path: "./mp3/Thang Dien - JustaTee_ Phuong Ly.mp3",
            image: "https://kenh14cdn.com/2018/11/29/mv-thangdien-cover1-15435076998152102352733.jpg",
            download: "https://data36.chiasenhac.com/downloads/1963/5/1962559-f4a83884/128/Thang%20Dien%20-%20JustaTee_%20Phuong%20Ly.mp3"
        },
        {
            name: "Phải Chăng Em Đã Yêu?",
            singer: "Juky San, REDT",
            path: "./mp3/Phai Chang Em Da Yeu - Juky San RedT (NhacPro.net).flac",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/1/e/3/31e3c0cca618fa62edb760f908d6f3c5.jpg",
            download: "https://vnno-vn-6-tf-mp3-s1-zmp3.zmdcdn.me/a426a0d3fa9213cc4a83/3329983269511390113?authen=exp=1663512857~acl=/a426a0d3fa9213cc4a83/*~hmac=0a0889298a406c995aa42e47a0b9d44c&fs=MTY2MzM0MDA1NzmUsIC3Mnx3ZWJWNnwxMDIzODMxNTmUsIC2fDQyLjExMy4xNzMdUngODY&filename=Phai-Chang-Em-Da-Yeu-Juky-San-RedT.mp3"
        },
        {
            name: "Có Chắc Yêu Là Đây",
            singer: "Sơn Tùng M-TP",
            path: "./mp3/Co Chac Yeu La Day.m4a",
            image: "https://data.chiasenhac.com/data/cover/124/123405.jpg",
            download: "https://media.phantam.top/files/Nhac-Lossless/m4a/Co%20Chac%20Yeu%20La%20Day.m4a"
        }
    ],
    heartList: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY))[[HEART_STORAGE_KEY]] || [],
    setConfig(key, value) {
        this.config[key] = value;
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
                    <div class="heart" data-index=${index}>
                        <i class="heart-icon ${this.heartList.includes(index) ? 'active-heart fa-solid' : 'fa-regular'} fa-heart"></i>
                    </div>
                    <div class="option" data-index=${index}>
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
        const firstSong = $('.song:first-child')
        const nameSong = $('.name-song')
        firstSong.style.marginTop = nameSong.offsetHeight - 14 + 'px'
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
            const seekTime = audio.duration * e.target.value / 100;
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
            if (songNode && !e.target.closest('.option') && !e.target.closest('.heart')) {
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
                if(menu) {
                    if (!menu.matches('.active-modal')) {
                        $('.dashboard').click()
                        menu.classList.add('active-modal')
                        
                    } else {
                        menu.classList.remove('active-modal')
                    }
                }

                // Định nghĩa 1 số element
                const itemSong = option.parentElement;
                const nameSongElement = itemSong.querySelector('.title') 
                const preMessage = $('.message');
                const newMessage = document.createElement('div');
                newMessage.classList.add('message');
                newMessage.innerHTML = `
                    <div class="message-container">
                        <i class="message-icon fa-solid"></i>
                        <p class="message-text"></p>
                    </div>
                `
                const messageIcon = newMessage.querySelector('.message-icon');
                const messageText = newMessage.querySelector('.message-text');
                
                // Khi xử lý vào phát bài tiếp theo
                const continueSong = option.querySelector('.next-song')
                if (continueSong) {
                    continueSong.onclick = function () {
                        var id = Number(option.getAttribute('data-index'))
                        _this.currentIndex = id - 1;
                        $('.dashboard').click()
                        
                        if (preMessage) {
                            dashboard.removeChild(preMessage)
                        }

                        messageIcon.classList.add('fa-circle-play')

                        messageText.innerText = 'Đã thêm bài hát vào danh sách tiếp theo'

                        dashboard.appendChild(newMessage)

                        setTimeout(() => {
                            newMessage.classList.add('remove-message')
                        }, 3000)
                    }
                }

                // Khi xử lý vào tải bài hát
                const downloadBtn = option.querySelector('.download')
                if (downloadBtn) {
                    downloadBtn.onclick = function() {
                        $('.dashboard').click()
                        if (preMessage) {
                            dashboard.removeChild(preMessage)
                        }

                        newMessage.style.backgroundColor = 'rgb(26, 192, 26)'
                        newMessage.style.opacity = '0.9'

                        messageIcon.classList.add('fa-circle-check')

                        messageText.innerText = `Đã tải bài hát ${nameSongElement.innerText}`

                        dashboard.appendChild(newMessage)

                        setTimeout(() => {
                            newMessage.classList.add('remove-message')
                        }, 3000)
                    }
                }
            }

            // Xử lý khi click vào mục heart
            if (e.target.closest('.heart')) {
                let heart = e.target.parentElement;
                if (!heart.matches('.heart')) {
                    heart = e.target
                }
                const id = Number(heart.getAttribute('data-index'))
                
                const heartIcon = heart.querySelector('.heart-icon')
                if (!heartIcon.matches('.active-heart')) {
                    heartIcon.classList.remove('fa-regular');
                    heartIcon.classList.add('fa-solid')
                    heartIcon.classList.add('active-heart')
                    _this.heartList.push(id)
                    _this.setConfig(HEART_STORAGE_KEY, _this.heartList)
                } else {
                    heartIcon.classList.remove('fa-solid')
                    heartIcon.classList.add('fa-regular')
                    heartIcon.classList.remove('active-heart')
                    _this.heartList = _this.heartList.filter(heartId => {
                        return heartId !== id
                    })
                    _this.setConfig(HEART_STORAGE_KEY, _this.heartList)
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