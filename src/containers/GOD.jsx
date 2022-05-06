import React from "react";
import { useEffect,useState } from "react";
import { useRef } from "react";
import { imageData } from "../data";
import styled, {keyframes} from 'styled-components';
import Spritesheet from 'react-responsive-spritesheet';
import runsprite from "../assets/orc-SheetwalkNew.png";
import runspritel from "../assets/walkleft.png";
import idle from "../assets/orc.png";
import LocomotiveScroll from "locomotive-scroll";
import "../../node_modules/locomotive-scroll/src/locomotive-scroll.scss";
import { SpriteAnimator } from 'react-sprite-animator'
import "../styles/home.scss";
import GalleryItem from "../components/GalleryItem";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Home = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref) {
      if (typeof window === "undefined" || !window.document) {
        return
      }
      const scroll = new LocomotiveScroll({
        el: ref.current,
        smooth: true,
        direction: "horizontal",
        multiplier: 0.5,
      });
    }
  }, []);


  const [animation, setanimation] = useState(idle);

  useEffect(() => {
    // function handleKeyDown(e) {
    //   console.log(e.keyCode);
    // }
    // function handleKeyUp(e) {
    //   console.log('no keys pushed');
    // }

    // document.addEventListener('keydown', handleKeyDown,false);
    // document.addEventListener('keydown', handleKeyUp,false);

    // // Don't forget to clean up
    // return function cleanup() {
    //   document.removeEventListener('keydown', handleKeyDown,false);
    // }

    var sprite = document.querySelector('.sprite'),
		key = {left: false, right: false},
		trans = 0,
		property = getTransformProperty(sprite);

	function getTransformProperty(element) {
	    var properties = [
	        'transform',
	        'WebkitTransform',
	        'msTransform',
	        'MozTransform',
	        'OTransform'
	    ];
	    var p;
	    while (p = properties.shift()) {
	        if (typeof element.style[p] != 'undefined') {
	            return p;
	        }
	    }
	    return false;
	}

	function translate() {
		sprite.style[property] = 'translateX(' + trans + 'px)';
	}

	function walk(e) {
		var keyCode = e.keyCode;
    console.log('e')
		if (keyCode === 39) {
      setanimation(runsprite)
			key.right = true;
		} else if (keyCode === 37) {
      setanimation(runspritel)
			key.left = true;
		}
    if (key.right === true) {
      console.log('derecha')
			// trans += 5;
			trans += 10;
			translate();
			sprite.classList.remove('left');
			sprite.classList.add('right');
			sprite.classList.add('walk-right');
		} else if (key.left === true) {
      console.log('izq')
			// trans -= 5;
			trans -= 10;
			translate();
			sprite.classList.remove('right');
			sprite.classList.add('left');
			sprite.classList.add('walk-left');
		}
	}

	function stop(e) {
    console.log('a')
    setanimation(idle)
		var keyCode = e.keyCode;
		if (keyCode === 39) {
			key.right = false;
		} else if (keyCode === 37) {
			key.left = false;
		}
		if (key.right === false) {
			sprite.classList.remove('walk-right');
		} if (key.left === false) {
			sprite.classList.remove('walk-left');
		}
	}

	document.addEventListener('keydown', walk, false);
	document.addEventListener('keyup', stop, false);
  }, []);

  const images = imageData.map((tupples, index) =>
    tupples.map((url, elementIndex) => (
      <GalleryItem
        key={url}
        src={url}
        index={elementIndex}
        columnOffset={index * 14}
      />
    ))
  );
  if (typeof window === "undefined" || !window.document) {
    return null
  }
  return (
    <>
      <div className="top"></div>
      {/* <Navbar /> */}
      <div className="main-container">
        <div className="scroll-container" data-scroll-container ref={ref}>
          <div className="content">



            <div className="gallery">
              {/* {images} */}
              {/* <div className="gallery-helper">Scroll to discover more</div> */}
              <div className="gallery-helper">Move left and right keys to move the character</div>
              <div className="behind-text fill" data-scroll data-scroll-speed>
                esto es un test
              </div>
              <div
                className="behind-text outline"
                data-scroll
                data-scroll-speed
              >
                esto es un test

              </div>
                <div className="fixscale">
                <div className="sprite">
                <Spritesheet
                        className=''
                    image={animation}
                    widthFrame={250}
                    heightFrame={250}
                    steps={6}
                    fps={10}
                    autoplay={true}
                    loop={true}
                  />
              </div> 
                </div>
              <div />
            </div>

            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
