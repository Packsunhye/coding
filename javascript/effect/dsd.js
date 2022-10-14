const cssList = document.querySelector(".search__list .line");
        // 데이터 출력하기
        const updateList = () => {
            let listCSS = "";
            cssProperty.forEach((data, index) => {
                listCSS += `<li>${data.num}. ${data.name} : ${data.desc}</li>`;
            });
            cssList.innerHTML = listCSS;
        }
        updateList();
        // 반대로 정렬 클릭
        document.querySelector(".btn1").addEventListener("click", (e) => {
            e.preventDefault();
            cssProperty.reverse();
            updateList();
        });
        // 오름차순 정렬 클릭
        document.querySelector(".btn2").addEventListener("click", (e) => {
            e.preventDefault();
            cssProperty.sort((a,b) => {
                return a.num - b.num;
            });
            updateList();
        });
        // 내림차순 정렬 클릭
        document.querySelector(".btn3").addEventListener("click", (e) => {
            e.preventDefault();
            cssProperty.sort((a,b) => {
                return b.num - a.num;
            });
            updateList();
        });
        // 알파벳 정렬(a~z) 클릭
        document.querySelector(".btn4").addEventListener("click", (e) => {
            e.preventDefault();
            cssProperty.sort((a, b) => {
                let x = a.name;
                let y = b.name;
                return x.localeCompare(y);
            });
            updateList();
        });
        // 알파벳 정렬(z~a) 클릭
        document.querySelector(".btn5").addEventListener("click", (e) => {
            e.preventDefault();
            cssProperty.sort((a, b) => {
                let x = a.name;
                let y = b.name;
                return y.localeCompare(x);
            });
            updateList();
        });
        // 랜덤 정렬
        document.querySelector(".btn6").addEventListener("click", (e) => {
            e.preventDefault();
            for(let i=cssProperty.length-1; i>=0; i--){
                const randomIndex = Math.floor(Math.random() * (i+1));
                [cssProperty[i], cssProperty[randomIndex]] = [cssProperty[randomIndex], cssProperty[i]];
                cssProperty.innerHTML += cssProperty[i]
            }
            updateList();
        });