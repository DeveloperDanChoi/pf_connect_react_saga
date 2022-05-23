import React from 'react';
const CommonUi = (props) => {
    useEffect(() => { //초기화
        setTempColor(currentTheme)
    
        const _checkbox = document.querySelectorAll(".slider");
        const _bg_box = document.querySelector(".theme-box").querySelectorAll("a");
    
        _checkbox.forEach((el) => {
          const item_id = el.previousSibling.id;
          if (item_state[item_id]) {
            el.classList.add("on");
          }
    
          el.addEventListener("click", (e) => { 
            e.preventDefault();
            e.target.closest(".slider").classList.toggle("on");
          });
    
          _bg_box.forEach((box) => { //모든 bg_box에 이벤트를 걸기
            box.addEventListener("click", (e) => {
              _bg_box.forEach((el) => {
                el.classList.remove("on");
              });
              box.classList.add("on");
            });
          });
          document
            .querySelector(".theme-box")
            .querySelector(`.${currentTheme}`)
            .classList.add("on");
        });
      }, []);
    
};
export default MyConnectPlug;
