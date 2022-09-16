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
            download: "https://dl118.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ3dqWjR1enhrZ0NlQllyb1FzMzYrMEs4aEJKdXdieFordEg5a2Y0VGJOZnQ2TWUwU29tNzBEQ1RpcCtKTWU2bnJ1bzRBbkV1MDBkVU85dXIrdGtYbzlqUlh3ZjlYSUVQTmFaR0YrNkVGZzNET0EyUGpYOGdid3ZHcmpxbDNRS2lJRHZqNDBMZlRFK2NJTmgwL1NZT0x3eHBJQTZIUzU3NG9hbjZLNzRVU2s1WjBKaWZGMmUwVWlkWUlKbDVmbGpMYkxvRWhFdHJkYTMxVzBvUENqRXBjNEdmalBMMkVqYlhGZHZyKzRHZ2dYMVNCRHF6anZydnB6dlNZYVovMXg2am89"
        },
        {
            name: "BlackJack",
            singer: "Sobin Hoàng Sơn, Binz",
            path: "./mp3/BlackJack - Soobin_ Binz.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/4/0/5/6/40564f839b476fd66838e497796a3d5f.jpg",
            download: "https://dl190.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ1h0L29ZN2o1b1NvbGxpTGRrODh1VkFlVnFaWVZFaHFpdUVOMWYzei9iZXB1TkpFU3VtYk1UQ1Z5SDhkOCtzRDdEdUtNMVNzQnlIU0R4bitPczJEeG0ya0h6ZDlUSUtxaFhlWDhtNWhKRnlpbUcyT1RXdkZDcWxYQzk5QWpSU25SUDRCMFJEL0g0LzR4TitEbjdTcm5wdzhORHFpT1F2NnhublBXRnBBamt4cVkzdGRrb0R4SWlJTU1PamNLbmpiYmZyRjBjM2NwSWpSbngrTFRnRllob0dLZlBLdz09",
        },
        {
            name: "Liếc Mắt Đưa Tình",
            singer: "K-ICM, Lena",
            path: "./mp3/Liec Mat Dua Tinh - K-ICM_ Lena.mp3",
            image:"https://linkhay.mediacdn.vn/storage/users/nhacdjvn/original/2020/12/01/224672.42XC05fc65dccb5efb.jpg",
            download: "https://dl164.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0lzWkFmbGxVQklPNXVnNjVrK3FHRmNveHREK0l1Nkw3cFZQMEFzR2VJTlBQZGRTNnZsOU1TQjFEU3NvNGVseGVFdUtVSmV1UTZjQ0t6dDhPTnQzcGJ2MHo3Ty91ZVVKa0dkRHhwNW1VeWxnU3lpZENCclY3MXYzaWc3RUNQYVNsRXZ5dFllL1BaL1pwM3hXamZaNnFoZ2JZY29qT0w5NWhNbjZLN3VSR2xodUFZdnBrbmVHeG1JNlZ4NjVUYTdmckw2MG9KMDk4YjMwTDVuOHpnQTRZbEZiZWJiVDU5TzM5WXY3bThEMGhLbDNOUHZuKzM3S3A0dlRkZklmZ3N1eVNuNzYvdFpHaz0%3D"
        },
        {
            name: "Chạy Về Khóc Với Anh",
            singer: "Erik",
            path: "./mp3/Chay Ve Khoc Voi Anh - ERIK (NhacPro.net).flac",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/c/6/d/e/c6def069a1a885c41fe479358fa7c506.jpg",
            download: "https://dl191.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0JxdndSakZzNlJJZ2Y0NndPd3EvbEFKMEtkL1pLN3R6bk00NFIxbWlkVUlHRk4wU0N2dDBGRVRhanBKMHNySHJzb01zQkNJSmxYbFBieUtPQ3RYcFZvVUxRTDUzdk5QMTNQVTR3bFFWR2dtT3g3clNNNlY3VG16aU85QWphUHdkQmhINHViTER5MDlvUjlFQ0FUdG5NbU5zcXF5Q1c0Wk5JMXJ1d29STC93UGtJc2Rod1VROVRkcDVPMFpQN2xObkJ0VVlhbE5jUnloN2lyK3VxQTZFbEhiR1dKSElpR0RzRy9QdjZYaDViblFNVDZELzdwSWwxcXpJdlZJSmwrRENDemNIQU5BN1djOUtsQ1phQkpiV0xpSVA4K3Vsb3JVVFZyKzdDd2NzV3dGdjBHNXltRm9KT29rWTVwUDdRczVsZ2xRUGduQndNMytRTGtRPT0%3D"
        },
        {
            name: "Chìm Sâu",
            singer: "MCK, Trung Trần",
            path: "./mp3/Chim Sau - MCK_ Trung Tran.mp3",
            image:
                "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/11/16/6/5/0/2/1605491409204_600.jpg",
            download: "https://dl233.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0hrSkFabEZVQ0lxWUhsY2dNaEtHQmNkd0VaWlUvK2NHUE12VWY4enZaWlp1L0locUhzZE1TVURha3BwTWZtSHJ1cElCckV1WjNVQi83a3VldjNSMXZtdzcyYlpQN0hMeFRZamwyc3hNbDFTK2Z5YzdFdUFIdzdqai9nVlNNZVRBZnNENU9iOVBkNGN3TmgwL1BLcVhDNm9kY255Zk4xNU4vOXVmVHVSR2xoYlU3dDRGRGNBSnhhNEJVeTUvaDF2M0orQlpQMXNwUGlSbjkvTExnRlpjdkdmak1MR0FnYUh0ZnIvejVBUjhjbm5jPQ%3D%3D"
        },
        {
            name: "Có Hẹn Với Thanh Xuân",
            singer: "Monstar",
            path: "./mp3/Co Hen Voi Thanh Xuan - Monstar.mp3",
            image:
                "https://data.chiasenhac.com/data/cover/144/143191.jpg",
            download: "https://dl156.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ24zZlpwZ2pKd1NxTUpnOXhxOWNYbEFaQkJaYkZLNk52bk0vd1JyQnpST3NTRE1RR0IvWUF6QjFEU3N2ZHZ0M1NFM3FFT2F2MVFaRjJ6bE9DbG56Si9pQXUrYzgzZUhMc2RlMzUvcGs4dDNqYkFpdmZkdFJESG8zeTVyeERHUGdJVHZTNGZLUGZWdE0xdTJIbVlLcVhDaDlWWGl6L043NXRkMzc2ZXV3eTlqdms5dCtOOVcwcExaWjlVNW83OTN2N0VtbDhNZ1pjajEwS3F1dmFuRktFNkdxT1hlajV4TWgwRS9Qem1YeVFJeGlFYjkxT281cDBzdGxOZlpKaFU3eXk1NmFHdllUcVhJL1RZQ1pTY091R3ZvOUh3Ny93ODdoZVg5YkNVeWNvUXhrNjBRZEw2RzRWYjRoWjc4ZkRGOXRwcnhsVG9pdz09"
        },
        {
            name: "Sài Gòn Đau Lòng Quá",
            singer: "Hứa Kim Tuyền, Hoàng Duyên",
            path:
                "./mp3/Sai Gon Dau Long Qua - Hua Kim Tuyen Hoang Duyen (NhacPro.net).flac",
            image:
                "https://cdnmedia.thethaovanhoa.vn/Upload/qPf4BjfjvkrFearu8hrw/files/avatahuakimtuyen.jpg",
            download: "https://dl60.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ1gzZlpwZ2toektPQnI0NjU4a3IzeURZSUtEZk5LbE5xREpKVjRzQjJMTkluWkhpakNoNjFqWVNERXI0ZDJyVENLME4xbGVKbC9IUjI5dnJmbXRCTXpxMUMrY05HSU1Pa1RUMVUrK3hkdW1DV2JpZEtIL0RmWnZYcm1zMHpJSnd4UGwycE9IOWVWME1kcG5rTGlRcnpRNXFsQWlIZmF3TGdNZ3FDei94bTk2NTE3bTQ4d0JoUmFWTnQ1N0tPdy9LT0ovV1kzeTdZNi9HU0hnTU9LVGJNRFVxaU9LbkYyTnk0TTF2L3VTQk5EaW5jNDRXT3I0cm9uNnlWYlY2MWx1eWZtMzZDc05CbUJMTS8zVzVUS0tlZXc3WWl5OGZob2dFYk9xTnpEblk5L21nZXBUL2Z1VTlBM3BVQWlyNXlJL1BNNHkxTzA1UXdTbCs0TysxLzlTRVFvVDZoQUtub3dNOWtPQWlBbnMvTHE1cWN5K3FCSWUxWG03WU0rY2Z3MHJwZkt6WVVXMFJHZzlPOHhhUVhWOTNLV2NjSHpURFk1dFROY0J3NzdVRWhjendObFpsYm9qNUlxbkRUL1hkcCtjRzhaMEhXdFN4eUhVZUkvSmZEWnlZaktlenVMdjlVRA%3D%3D"
        },
        {
            name: "Lemon Tree",
            singer: "DJ DESA",
            path: "./mp3/Lemon-Tree-Remix-Tiktok-DJ-DESA-Remix.mp3",
            image:
                "https://avatar-ex-swe.nixcdn.com/singer/avatar/2014/13/7E4149A9_1321_600.jpg",
            download: "https://dl150.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0luZGcxeVZzWEU2NUo3Y1lML2ErRUJ2cHVaWlVLd0lPNld2Sk41emZiWXB2QUJnYU1vb3N6UURqS3c5ODJqVERFdU1BdFNabzNVQi8wbnRtemx5VisxRUtuV01IQ0FLeERiM0krOFdadXczWFdudGVGL0VmZXFpK2dwbG1HSWljRnYzQkdkdm5WL0pCRzZuM1phdkxiMTVvNnFTT000NlZiMy8yVXJBM3YwYnM5cStOalYwRmdZSVZmelpQK3kvL0htbVZJcktnSWkxN3pzZU9IU0pNbFQrT1pmRGd0Q0F4UDdQZi9WUWtiMnl3VC9USHZvUGwydlROY0lmY2pybkc5NC9lME5XL0lKcE9pRjllWFBMVzVwSkU9"
        },
        {
            name: "Shay Nắnggg",
            singer: "Amee, Obito",
            path: "./mp3/Shay Nanggg - AMee_ Obito.mp3",
            image:
                "https://dep.com.vn/wp-content/uploads/2022/06/5-4.png",
            download: "https://dl104.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0ZsZEEvakFob0xxbEZzb0prejYrSVp1d2VhNFV0aUt2N0VKVi8vRE9UUmNXU2RTclk4N29FQnl2UStaMTJpamZPNnNVT0hPd2dFelRaM3NlRm1EWnhqa3paWjhyRUZxc1lZR2NvNVVacTN5T3MzUERBc1VpOTRWdTBxRmlYZVNZUDkya3RNT1dEdE0xdWpDeVpTZS9xZzZRSC9DUzl5NE5vbFAyTjUwZnh4cjFqanZJelcxeGtlb0pZelpQNDJxMmQ4eEZLMDhwSml4ajA3L0d2SEp0b1QvYkpMV0loYkdRYS83THJYa3BQ"
        },
        {
            name: "There's No One At All",
            singer: "Sơn Tùng MTP",
            path: "./mp3/There_s No One At All - Son Tung M-TP.mp3",
            image: "https://media.yeah1.com/files/uploads/editors/68/2022/05/09/3wwcbzPK1FwsWYqyTVIHHvFQVD5Og4zX92FTYz40.jpg",
            download: "https://dl125.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ1FrTkFvd2dOb0w2UUhpWU1xbk1XMGFPaERJdXdEaHJubk1vZ1IxRy9XT3VUT0Uxek1sTUVvUlRpc3crWjI4aFBXNFljalNvSkNRaGYvbnFpdWhtSXdqdzc1ZStmZEZLeGVNRElwaFZsc3hqS0d6dlNSNnpQMW95N285V3ZhS1hZc2tEOWJHdUxiNU5KYjNVQ0ZZdWUzbFpjQW9udXB6TnhNd3VDVXBnVGl5cjg3NVkwakNCY25JTVVNZ00renpQbldvQnBMMTh4SWdoN3k3L0d3VzVvM1NBPT0%3D"
        },
        {
            name: "You Don't Know Me",
            singer: "Ofenbach, Brodie Barclay",
            path: "./mp3/YouDontKnowMe-OfenbachBrodieBarclay-4396475.mp3",
            image:
              "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/3/a/f/7/3af7f320df86e0f6b76caf147b499cc4.jpg",
            download: "https://dl256.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0xudEEweFJFZ0NlQUhuNEk2bk1DdkxkMEVCYWtBMnNHUEZKVWY4eXFUVThLRU5BYU0vYm9uVUhDTjlzOTJsU2JkK28wekY4UmhCVkQra3VxbXFTRjNuUStvTzRyckRMZERlV0o1cGdVeDlTdURuN1NHbnhPOTRWdStqUlNCYnl0WTVTNFRMcnZkNGN3TzBtekVNc0hLbFpVZHZTK041NDVBMS9YQTVWZWdrT0Z0N1k0bUNBSm5lb3BZaE1ta2pxaWE4eEJmazQ5QjNrLzErUT09"
        },
        {
            name: "Có Em Chờ",
            singer: "MIN, Mr A",
            path: "./mp3/Co Em Cho - MIN Mr A (NhacPro.net).flac",
            image: "https://afamilycdn.com/150157425591193600/2020/10/30/min-160407578725129366232.jpg",
            download: "https://dl234.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0gzZlpwZ2tsd1NvNWg3YTRIa3NIeFp1dHRhLzRzaHF5WFBmSWZ3eGY4VlAvQUhEYTduN3NWQ1RpczN2aDJud3VFM3J3QkY4UmhCVkQra3VxbXFTRjNuUStvTzRyckRMZERlV0o1cGdVeDlTdURuN1NHbnhHOTRWdWR0bjdSVlFBanBnSllCTHZkNGN3TzBtekVNc0hLbFpVZHZTK041NDVBMS9YQTVWZWdrT0Z0N1k0akN3Sm5lb3BZaE1taWlLR2I5UkpmazQ5QjNrLzk%3D"
        },
        {
            name: "Anh Đánh Rơi Người Yêu Này",
            singer: "Andiez, AMEE",
            path: "./mp3/Anh Danh Roi Nguoi Yeu Nay.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/0/8/c/308c5809bbfa86de59709090245b9819.jpg",
            download: "https://dl207.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0ZsdDF4Z2pOM1JQSWM0NjU4a3NYeExjRUVIT0lzbTgrRFFOY2Yyem1kVW9iT0VsL01rOGxqWUZIRXJ2STA4Z2FLME4xbGVPaGtIVGk5dUxYbXQyRnZ3a3pVY056RUVLSWRUSHArcGdzby9oRFk0T2pHc0JicitGV0o2VUNUUDJJTXV6Y09BdVhSNVpjVmtEdnRkdmp4eDRVSHFHUE54SmRaaWJYUGtnZXprWlFNaVBkRFcxWkdSNjljOU5UNHo2T0tva0lXM2E4eW5FaTh1ZXUwQTRvOEVhRERLR0VtYlhGYXZMeS9EbDBOeGo4YnBUL3RvUHR5dWpoUFlyWW83R0R0"
        },
        {
            name: "BAAM",
            singer: "Momoland",
            path: "./mp3/Baam - Momoland.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/0/e/a/30ea3cc46512569d3abdaf9e50daddd4.jpg",
            download: "https://dl32.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0p0L2dWNnpFTkplNXBoTWdPOXFHQmU0eHFET0l1N00rRFNadHgxM3VCVkpYU0UwcXNsTjEvRVRiWTFKMTJteDd1M3NVRFZzVitSRjNibE9LbWtucGFrQlg4ZmN1R01MWlJYM2gyaTBGdG5TdURuN2ZTc0JuOWpHMnNzMFhlS1hZc3F6UWVLZURTOU5vYTgyVGJQTEsyOVpSQS93Q0dzSmRJenZYVHR3NzdpUDkxdGRONFVVaDFmWlJpMjV2MDBzL1Bxa3NXa3FZZjFVbWhyZDJxSDR3OEg3YWhmRGwzTEMwRTRlN2hZeDA2eGpBeDltM3o3SnQ5b0cwWkl1Wnk3VzNwejl5dll5ZUlkOUR6VzVpSkw3WHM4Sk9xc2FvMDdCV1k0UERPaHA4ZHhWdndHWkNuRlpjYnB4SW5vL1k9"
        },
        {
            name: "Tình Bạn Diệu Kỳ",
            singer: "AMee, Ricky Star, Lăng LD",
            path: "./mp3/Tinh ban dieu ky.mp3",
            image: "https://data.chiasenhac.com/data/cover/137/136473.jpg",
            download: "https://dl167.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ1EzZlpwZ2tnQUw0TUhoTWdLaHFHQ0FveHVmb2xFNmFQbk5JOFIxeHlkS1lhK2V5VE1rOGxqWUZIRTFZUjI4aDdpMXF0clFZSkRmelhUb3EyUW9oQkV3aCsrVXAzdVFmME9QMWxjNkd4SG1HMmczUFRYc0JUMCtGQ2I3R0tGYWkwSnV6b0hjL2pBb3RsTzNHWE9VT2ZseDVoWTZIUzUrNVZjenVXZnNVU2s1Yjh1NjVrbmVCQXhJYlpFaTVmMHkvV0Nwa2dVeTlSWHprU3FvZDJrQjVBS0dLeWJiQWg3SngwSTVPcnFZd01oM1N3ZDgzV0I1YnNrL0Y4UlRxeDA1bVdMOWZiV2RTK2RmY3YzUTY2SlBOZXlvTVB3NGZCZ3MzNzF0dTd4aHJoRHBsLzNmWWJ5Vm9KT3Rrb3MvSld0bzhrdTBsK3IzeHNUaitWVWxSMnFKQjl1RzhNYWNERWNMdFlTV24xSitwK3dzZlY2N29rUmFrNnlzdz09"
        },
        {
            name: "Yêu Là Tha Thu",
            singer: "OnlyC",
            path: "./mp3/Yêu Là Tha Thu (Em Chưa 18 OST).mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2017/05/15/1/9/3/6/1494842845652_640.jpg",
            download: "https://dl208.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ2QzZlpwZ2pFQ0ZPQkE0NjU4a3NYd2FQMUhMK3c3eFovcFd2RmErU2VUVXB2QUZRTENsWkJqWVNYRTFZWTg4bTZYdUtFVGJZSTZlZy9xa3VYbzNTZC9qQlBtYTlxR1hvaDRURnd3a1VWdjFpZUF5Yi9acVVhK3RYU2hvbktUYlRBQzczNVpHK3pmNUl0ZDEyeU9QZEhwdzhOQS93Q2NwOGh2akwyWmx3LzY3NG9Ua3RjN1UxUW5OWmRZMXNmRDhiYkp2VmNRa3B3STAwQ2g5TFB3VU0xbVQvREtMR2MyTFNzVDdMSzdDRWxObUhKTnZuK29xNnNudkE9PQ%3D%3D"
        },
        {
            name: "Màu Nước Mắt",
            singer: "Nguyễn Trần Trung Quân",
            path: "./mp3/Mau Nuoc Mat - Nguyen Tran Trung Quan.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/8/f/5/0/8f50e5afbf4daa6d062019bc36f3ab1a.jpg",
            download: "https://dl81.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0ozZlpwZ2pGekZPQmk0NjU1a3Nid1p1d2VhNFV0aU5PQUVwVjVzQnVKTlBLcWRTNnZvdE50YkhTVTdwTVk2SHJ0MGN0NERNYzZZZ1M5dnJmbXRCQXpxRkQ3TmV6ZkFMWlJKa1p1NW1Nd2xnZkJ3cnFmbGhQK3VuNmtwa0hJUUQwWXV6Z1lkc1BaOVpwSG0yVGJQTEhpMnB3QWtqYWU5cElVbjZLN3JRN2oxNmM4dlprbmVFbGtJTlVQLzh1d2pkYjJ0QlZBaGNnbHp3Q3ltS3lyRnMxekc2Q1JKQUZlZUNjUitlYjlXUThYd2lCRHFUcm9wZngydXpWWkllWm00WGl4cEtleE5XelBLSlN3WElmWkx1cnM5QT09"
        },
        {
            name: "Phía Sau Một Cô Gái",
            singer: "Soobin Hoàng Sơn",
            path: "./mp3/Phia Sau Mot Co Gai.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/c/b/cbe2dfb3d65dc97c68f983d09bff78a7_1476796126.jpg",
            download: "https://dl191.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ1VzSkFabEZWN0pZb0hsYXdhbk1ubEJwZ0tESVZLbE5LV1d2MFIxbTJkS0lUQUYwcXE1ZDErRTFyS3ZPVXl0ajNHL2NVSVZveFNCVlBaeStpazNRSXpxbEd3WDRuRFh2TjVTMUZTZ0dsQy8yMi8xZVBkdWw3T3VubW9xQWJOWVRSWjlEMENNZkR2NFo1YzNUU09QZEg5M0lVUnVDU2FwOGh2MStETzhWUFF3UGRzbnNVblUwVmdkdDVlMXBlK2tydmNyVTRZdjRvZHozS3BwdmFaQlpFS0c2U1hSaVIvTVNBQTU5RG5VeG9ReUJvTjkyS0IrYWtqNTJNQWNLeEs1SHVtOFBIV2NEYWNlODNKUmE2N0c3bnVyK1RoelBJdnNsR1M0T1RDazhkMnVFNmlVTmoyVk5RY3VFSW0vUExWczU5bGtRUHNqbGxja2VrVHdSYW9JeDF2Rzg0YVpXUVplc2dWVUE9PQ%3D%3D"
        },
        {
            name: "Nơi Này Có Anh",
            singer: "Sơn Tùng M-TP",
            path: "./mp3/Noi Nay Co Anh - Son Tung M-TP.mp3",
            image: "https://www.remixviet.net/data/upload/noi-nay-co-anh.png",
            download: "https://dl90.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0szZlpzZ2pGeUNPQmk0NjU4a3NYd09vSnNhNFJjaUtqeFd2OWEvWFgwZnNhT2V5YWEvZE1LVzJHSTlNVjJqemJMOW9GckV2MTVVMTNlaWUrd2ducEJpQjY3YzhpZVU3NWZZWEpFczBGMzIzdldudGZOdGdEc3BuK280aCtsWVRSWjkya3RQTENDMTRZYTJHamZhcm5uM0oxTzRHMlI3Wk4yMVBHRWl3TDUvTE13c09ONVVWSnhUSmxPNXBic3pmblB0bmdQaVowWjFYS3dvZWVaQUl3OEQ3R2hialpwQVJVaHVkWGRUVU01MmpRTnRtR3VwZWtpNjI5VVI0NHo3WHFrOE9Ec2NqYVZlNStuR2NmWGVidm84SldwcE9wb3BVU2M4cktVenNnWHdVNjBYcFg3UklCWg%3D%3D"
        },
        {
            name: "Thằng Điên",
            singer: "Justatee, Phương Ly",
            path: "./mp3/Thang Dien - JustaTee_ Phuong Ly.mp3",
            image: "https://kenh14cdn.com/2018/11/29/mv-thangdien-cover1-15435076998152102352733.jpg",
            download: "https://dl182.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ1FrSkFmbGxVQklPNXU5NE1vbktHRGQ0d1dmcTVLN3Rubk1QOWF2bldUT3ZxZUl4dUlvcDBqQ1hXVnZPWTEvQnladHF4d0hPb25FemVwbGVIb3VpZzl3a3krVXNIZkhMdEZJM3ByOEFabDJpcVc4K0hWclIybDlpK0x2a0tXZURFSXQzNVpHL2pBb3RvYTh6Nk9QZEcxL3J4WGpIS2w1SlJxNDc2UXBGS3d4TGN4NWVwYkdFRnNZNWxQM0k3ODB2V1I5QkZQMDhwUGp4djMrcVMxRDRRd1FmYkpLMkVqYW5SUCt2bXlXQmxQ"
        },
        {
            name: "Phải Chăng Em Đã Yêu?",
            singer: "Juky San, REDT",
            path: "./mp3/Phai Chang Em Da Yeu - Juky San RedT (NhacPro.net).flac",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/1/e/3/31e3c0cca618fa62edb760f908d6f3c5.jpg",
            download: "https://dl34.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0lnY2N6eEFNVENlNXA5OGdOOXFHQmNNQUVEYTlLN3Q3blNZMWE4blg5Zkp2T0Uxdk03OGhqWVNERTFvVjJnSHJzb01zQmVOdzZIVHp0a1Avb3BUQjR3Z0hoTmVyb01Zd2RKa2R6NW1VeWxnU3lpZENIc0Y3N3V6aU84d2piUHlvTitUNEdkckR6cGRvUmhDem9QTExGZ05zYzZBWE1wN3Rvejd1VHN3RHZpS1o3blkwd2ZHWXhVcklXMnQvV2pMWHQ5RTVTanBGWitSN2hpTUdvVGRzV1NPREhLSEpWYjJjcnlLck9DdzVWMnl4YjJ6LzcxNDRyb0cwWkl1Wno0VzZ4eHVMb2NqZkZPNURRVnA2UlB2Mi9vNENyeFBSeDdBU1RnT0dDenJ4d3V4ei9jT3FxWWQ5WWxBRXVzZkRGNHNrNW4yQ1huQW9Da3VrYndWLzFla2xnSDhFZGNDUmNjcHBBVldnTG90Zm50UFZzcnNnY09CK2w4S3BzYy9oaw%3D%3D"
        },
        {
            name: "Có Chắc Yêu Là Đây",
            singer: "Sơn Tùng M-TP",
            path: "./mp3/Co Chac Yeu La Day.m4a",
            image: "https://data.chiasenhac.com/data/cover/124/123405.jpg",
            download: "https://dl132.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ1gzZlpzZ2pGekwrQjQ0NjU4a3IzNURlNEVBNU0vaHNHQlZQMEhzR2VMT3ZPamRTclk4N29IQjFLazFKMEUvQnljdHRZQmJJSmRFeldyM3I3ejNYUlYzVUtzTHAzdVJ2ME9QMDR3Nkc5RjlRK3c1ZEQ0OGpqTmdGU083SHVxU0FFbC9EWWJiclBXK0pOTjZubktlLys1bHNJanRDbUs5bzlMMzdYUGtnem1rUGRzbm84d0RHSnRJWjFjelorNzNQL0I3Z3BTazVZUzVWbXhwK1daQzZFaERKcWRkZ2h6TmlNSzF2YnFTU1FTemhvYStYV0IrYWtqNTJNQWNLeEs1WGVuOFBIV2NEYWNlODNKR1lYSkIrS2ZwOS9xc2ZZdnNsR1M0T1RDazhkMnVFNmlVTmoyVk5RY3VFSW0vUExWczU5bGtRUHVpMWhja2VrVHdSYXZJeFJvR2M4YVpXUVplc2dWVlE9PQ%3D%3D"
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