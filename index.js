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
            name: 'Chạy Khỏi Thế Giới Này (Remix)',
            singer: 'Da LAB, Phương Ly',
            path: './mp3/Chay Khoi The Gioi Nay Cukak Remix_ - Da.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/5/b/9/6/5b96fdda0362a6b85fe54c4ce1d58e0b.jpg'
        },
        {
            name: 'Waiting For You',
            singer: 'MONO, Onionn',
            path: './mp3/WaitingForYou-MONOOnionn-7733882.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/e/7/7/2/e772358978fef8a02eefd34f6a4ca6f3.jpg'
        },
        {
            name: 'Có Đâu Ai Ngờ',
            singer: 'Thu Cầm',
            path: './mp3/CoDauAiNgo-ThuCam-7857284.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/8/f/a/d/8fad544d5867f773beb186a88d9f9071.jpg'
        },
        {
            name: 'Bắt Cóc Con Tim',
            singer: 'Lou Hoàng',
            path: './mp3/Bat Coc Con Tim - Lou Hoang.mp3',
            image: 'https://data.chiasenhac.com/data/cover/169/168258.jpg'
        },
        {
            name: "Phố Đã Lên Đèn",
            singer: "Huyền Tâm Môn",
            path: "./mp3/Pho Da Len Den - Huyen Tam Mon - Huyen T.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/1/2/3/5/12358eabe806af65178e625d01c1dfb3.jpg"
        },
        {
            name: "Từ Thích Thích Thành Thương Thương",
            singer: "AMEE, Hoàng Dũng",
            path: "./mp3/tu thich thich thanh thuong th... - AMEE Hoang Dung (NhacPro.net).flac",
            image: "https://static-images.vnncdn.net/files/publish/2022/5/27/hain7580-102.jpg",
        },
        {
            name: "BlackJack",
            singer: "Sobin Hoàng Sơn, Binz",
            path: "./mp3/BlackJack - Soobin_ Binz.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/4/0/5/6/40564f839b476fd66838e497796a3d5f.jpg",
        },
        {
            name: "Liếc Mắt Đưa Tình",
            singer: "K-ICM, Lena",
            path: "./mp3/Liec Mat Dua Tinh - K-ICM_ Lena.mp3",
            image:"https://linkhay.mediacdn.vn/storage/users/nhacdjvn/original/2020/12/01/224672.42XC05fc65dccb5efb.jpg",
        },
        {
            name: "Chạy Về Khóc Với Anh",
            singer: "Erik",
            path: "./mp3/Chay Ve Khoc Voi Anh - ERIK (NhacPro.net).flac",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/c/6/d/e/c6def069a1a885c41fe479358fa7c506.jpg",
        },
        {
            name: "Chìm Sâu",
            singer: "MCK, Trung Trần",
            path: "./mp3/Chim Sau - MCK_ Trung Tran.mp3",
            image:
                "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/11/16/6/5/0/2/1605491409204_600.jpg",
        },
        {
            name: "Có Hẹn Với Thanh Xuân",
            singer: "Monstar",
            path: "./mp3/Co Hen Voi Thanh Xuan - Monstar.mp3",
            image:
                "https://data.chiasenhac.com/data/cover/144/143191.jpg",
        },
        {
            name: "Sài Gòn Đau Lòng Quá",
            singer: "Hứa Kim Tuyền, Hoàng Duyên",
            path:
                "./mp3/Sai Gon Dau Long Qua - Hua Kim Tuyen Hoang Duyen (NhacPro.net).flac",
            image:
                "https://cdnmedia.thethaovanhoa.vn/Upload/qPf4BjfjvkrFearu8hrw/files/avatahuakimtuyen.jpg",
        },
        {
            name: "Lemon Tree",
            singer: "DJ DESA",
            path: "./mp3/Lemon-Tree-Remix-Tiktok-DJ-DESA-Remix.mp3",
            image:
                "https://avatar-ex-swe.nixcdn.com/singer/avatar/2014/13/7E4149A9_1321_600.jpg",
        },
        {
            name: "Shay Nắnggg",
            singer: "Amee, Obito",
            path: "./mp3/Shay Nanggg - AMee_ Obito.mp3",
            image:
                "https://dep.com.vn/wp-content/uploads/2022/06/5-4.png",
        },
        {
            name: "There's No One At All",
            singer: "Sơn Tùng MTP",
            path: "./mp3/There_s No One At All - Son Tung M-TP.mp3",
            image: "https://media.yeah1.com/files/uploads/editors/68/2022/05/09/3wwcbzPK1FwsWYqyTVIHHvFQVD5Og4zX92FTYz40.jpg",
        },
        {
            name: "You Don't Know Me",
            singer: "Ofenbach, Brodie Barclay",
            path: "./mp3/YouDontKnowMe-OfenbachBrodieBarclay-4396475.mp3",
            image:
              "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/3/a/f/7/3af7f320df86e0f6b76caf147b499cc4.jpg",

        },
        {
            name: "Có Em Chờ",
            singer: "MIN, Mr A",
            path: "./mp3/Co Em Cho - MIN Mr A (NhacPro.net).flac",
            image: "https://afamilycdn.com/150157425591193600/2020/10/30/min-160407578725129366232.jpg",
        },
        {
            name: "Anh Đánh Rơi Người Yêu Này",
            singer: "Andiez, AMEE",
            path: "./mp3/Anh Danh Roi Nguoi Yeu Nay.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/0/8/c/308c5809bbfa86de59709090245b9819.jpg",
        },
        {
            name: "BAAM",
            singer: "Momoland",
            path: "./mp3/Baam - Momoland.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/0/e/a/30ea3cc46512569d3abdaf9e50daddd4.jpg",
        },
        {
            name: "Tình Bạn Diệu Kỳ",
            singer: "AMee, Ricky Star, Lăng LD",
            path: "./mp3/Tinh ban dieu ky.mp3",
            image: "https://data.chiasenhac.com/data/cover/137/136473.jpg",
        },
        {
            name: "Yêu Là Tha Thu",
            singer: "OnlyC",
            path: "./mp3/Yêu Là Tha Thu (Em Chưa 18 OST).mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2017/05/15/1/9/3/6/1494842845652_640.jpg",
        },
        {
            name: "Màu Nước Mắt",
            singer: "Nguyễn Trần Trung Quân",
            path: "./mp3/Mau Nuoc Mat - Nguyen Tran Trung Quan.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/8/f/5/0/8f50e5afbf4daa6d062019bc36f3ab1a.jpg",
        },
        {
            name: "Phía Sau Một Cô Gái",
            singer: "Soobin Hoàng Sơn",
            path: "./mp3/Phia Sau Mot Co Gai.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/c/b/cbe2dfb3d65dc97c68f983d09bff78a7_1476796126.jpg",
        },
        {
            name: "Nơi Này Có Anh",
            singer: "Sơn Tùng M-TP",
            path: "./mp3/Noi Nay Co Anh - Son Tung M-TP.mp3",
            image: "https://www.remixviet.net/data/upload/noi-nay-co-anh.png",
        },
        {
            name: "Thằng Điên",
            singer: "Justatee, Phương Ly",
            path: "./mp3/Thang Dien - JustaTee_ Phuong Ly.mp3",
            image: "https://kenh14cdn.com/2018/11/29/mv-thangdien-cover1-15435076998152102352733.jpg",
        },
        {
            name: "Phải Chăng Em Đã Yêu?",
            singer: "Juky San, REDT",
            path: "./mp3/Phai Chang Em Da Yeu - Juky San RedT (NhacPro.net).flac",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/1/e/3/31e3c0cca618fa62edb760f908d6f3c5.jpg",
        },
        {
            name: "Có Chắc Yêu Là Đây",
            singer: "Sơn Tùng M-TP",
            path: "./mp3/Co Chac Yeu La Day.m4a",
            image: "https://data.chiasenhac.com/data/cover/124/123405.jpg",
        },
        {
            name: "Em Không Sai, Chúng Ta Sai",
            singer: "Erik",
            path: "./mp3/Em Khong Sai Chung Ta Sai.m4a",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/7/4/0/d/740d5e0fd272d2421d441e9fd5c08fdd.jpg",
        },
        {
            name: "Có Tất Cả Nhưng Thiếu Anh",
            singer: "Erik",
            path: "./mp3/Co Tat Ca Nhung Thieu Anh - Erik.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/6/b/e/4/6be430e44902db6e3e28e8a39034f4df.jpg"
        },
        {
            name: "Siren",
            singer: "TGSN, Tlinh, RZ Mas",
            path: "./mp3/Siren.mp3",
            image: "https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/4/14/anh-2-8-1649908138387114238504.jpg",
        },
        {
            name: "Gái Độc Thân",
            singer: "Tlinh",
            path: "./mp3/GaiDocThan-tlinh-7041472.mp3",
            image: "https://data.chiasenhac.com/data/cover/143/142338.jpg"
        },
        {
            name: "Vì Yêu Cứ Đâm Đầu",
            singer: "Min, JustaTee, Đen",
            path: "./mp3/Vi Yeu Cu Dam Dau - Min_ JustaTee_ Den.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/6/b/5/9/6b5976bfce7675c94bcd3f9c043bd297.jpg"
        },
        {
            name: "Buông Đôi Tay Nhau Ra",
            singer: "Sơn Tùng MTP",
            path: "./mp3/Buong-Doi-Tay-Nhau-Ra-Son-Tung-M-TP.mp3",
            image: "https://allvpop.com/wp-content/uploads/2016/03/25345210594_7b5592d59c_o.jpg"
        },
        {
            name: "Âm Thầm Bên Em",
            singer: "Sơn Tùng M-TP",
            path: "./mp3/Am Tham Ben Em - Son Tung M-TP.mp3",
            image: "https://i1.sndcdn.com/artworks-000125300780-pmpcrc-t500x500.jpg"
        },
        {
            name: "Gác Lại Âu Lo",
            singer: "Da LAB, Miu Lê",
            path: "./mp3/Gac-Lai-Au-Lo-Da-LAB-Miu-Le.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/5/8/a/d58aa48a38c0a8dc89c95277b456bc75.jpg"
        },
        {
            name: "Bánh Mỳ Không",
            singer: "Đạt G, DuUyên",
            path: "./mp3/BanhMiKhong-DatGDuUyen-6175988.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/2/9/0/6/2906681d4b764cd4677342b66813f25d.jpg"
        },
        {
            name: "Ngày Đầu Tiên",
            singer: "Đức Phúc",
            path: "./mp3/Ngày Đầu Tiên.mp3",
            image: "https://i1.sndcdn.com/artworks-IM3jtFScLqGHmD7m-kH0PzA-t500x500.jpg"
        },
        {
            name: "Hơn Cả Yêu",
            singer: "Đức Phúc",
            path: "./mp3/Hon Ca Yeu - Nguyen Duc Phuc.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/a/9/e/d/a9ed142c215560ab45f6b2b433907f90.jpg"
        }
    ],
    heartList: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) ? JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY))[HEART_STORAGE_KEY] : [],
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
                            <a class="download" download="${song.name}" href="${song.path}">
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

            cd.style.width = (newWidth > 0) ? newWidth + 'px' : 0
            cd.style.opacity = (newWidth > 0) ? newWidth / cdWidth : 0
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
                block: 'end',
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