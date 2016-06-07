
        window.onload = function () {
            var omain = document.getElementById("main");
            var height = 15, width= 30; 
            var asnake = [];
            var speed = 150;
            var odiv = document.createElement("div");
            asnake.push({ left: Math.floor(Math.random() * width), up: Math.floor(Math.random() * height), div: odiv, d: "left" });
            omain.appendChild(odiv);
            setPosition(asnake[0]);
            //设置位置
            function setPosition(obj) {
                obj.div.style.left = obj.left * 20 + "px";
                obj.div.style.top = obj.up * 20 + "px";
            }
            var aEat = null;
            var d = "left";
            //创建吃的
            function createEat() {
                var left = Math.floor(Math.random() * width);
                var up = Math.floor(Math.random() * height);
                var isexist = false;
                //判断是否存在在设数组里面
                for (var i = 0; i < asnake.length; i++) {
                    if (left == asnake[i].left && up == asnake[i].up) {
                        isexist = true;
                        break;
                    }
                }

                //如果存在再创建一个蛇
                if (isexist) {
                    createEat();
                    return;
                }
                var onewdiv = document.createElement("div");
                onewdiv.className = "snake";
                aEat = { left: left, up: up, div: onewdiv, d: "left" };
                omain.appendChild(onewdiv);
                setPosition(aEat);
            }
            createEat()
 
            var obtn = document.getElementById("btn");
            var oscore = document.getElementById("score");
            var oaddspeed = document.getElementById("addspeed");
 
            var otimer = null;
            var isitem = true;
            oaddspeed.onclick = function () {
                clearInterval(otimer);
                speed = speed < 50 ? 50 : speed - 20;
                setasnke();
            }
            obtn.onclick = function () {
                if (!isitem) {
                    clearInterval(otimer);
                    obtn.value = "继续游戏";
                    isitem = true;
                    return false;
                }
                obtn.value = "暂停游戏";
                setasnke();
                isitem = false;
            }
 
            function setasnke() {
 
                otimer = setInterval(function () {
                    for (var i = asnake.length - 1; i > 0; i--) {//l t r b
                        asnake[i].left = asnake[i - 1].left;
                        asnake[i].up = asnake[i - 1].up;
                        asnake[i].d = asnake[i - 1].d;
                    }
                    switch (d) {
                        case "left":
                            asnake[0].left--;
                            break;
                        case "right":
                            asnake[0].left++;
                            break;
                        case "up":
                            asnake[0].up--;
                            break;
                        case "down":
                            asnake[0].up++;
                            break;
                    }
                    //判断蛇是否撞墙了
                    if (asnake[0].left < 0 || asnake[0].left >= width || asnake[0].up < 0 || asnake[0].up >= height) {
                        alert("你死掉了");
                        clearInterval(otimer);
                        return;
                    }
                    //判断蛇是否撞到自己了
                    for (var n = 1; n < asnake.length; n++) {
                        if (asnake[0].left == asnake[n].left && asnake[0].up == asnake[n].up) {
                            alert("你已经死掉了");
                            clearInterval(otimer);
                            return;
                        }
                    }
                    //判断蛇是否吃到东西了
                    if (asnake[0].left == aEat.left && asnake[0].up == aEat.up) {//l t r b
                        aEat.div.className = "";
                        oscore.innerHTML = parseInt(oscore.innerHTML) + 1;
                        asnake.push(aEat);
                        createEat();
                    }
                    //重新设置蛇的位置
                    for (var j = 0; j < asnake.length; j++) {
                        setPosition(asnake[j]);
                    }
                }, speed);
            }
 
            //键盘改变蛇的方向
            document.onkeydown = function (event) {
                var oEn = event || window.event;
                var oCode = oEn.keyCode;
                switch (oCode) {
                    case 37:
                        d = "left";
                        break;
                    case 38:
                        d = "up";
                        break;
                    case 39:
                        d = "right";
                        break;
                    case 40:
                        d = "down";
                        break;
                }
            }
        }
