import { useEffect, useRef } from "react";
import PaneFlow from "./paneflow";
import "./paneflow.css";
import "./MyPaneFlow.css";

export default function Testing() {
  const paneFlowElRef = useRef(null);
  const paneFlowInstanceRef = useRef(null);

  useEffect(() => {
    if (paneFlowElRef.current) {
      paneFlowInstanceRef.current = new PaneFlow({
        el: paneFlowElRef.current,
        padding: "3.6cqw",
        gap: "0cqw",
        transitionDuration: 750,
        blockDelay: 30,
        blockBorderRadius: "1.5cqw",
        initialPaneIndex: 0,
        panes: [
          {
            cols: 4,
            rows: 4,
            blocks: [
              {
                el: ".paneflow-block-X5ym2S",
                col: 0,
                row: 0,
                widthCols: 4,
                heightRows: 1,
                children: [
                  {
                    el: ".paneflow-item-rrHNvD",
                    translateX: "3.6cqw",
                    translateY: "1.9cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 1,
                  },
                ],
                enterFrom: "top",
                exitTo: "top",
              },
              {
                el: ".paneflow-block-zGDkry",
                col: 0,
                row: 1,
                widthCols: 4,
                heightRows: 1,
                children: [
                  {
                    el: ".paneflow-item-6bpSMj",
                    translateX: "25.8cqw",
                    translateY: "1.6cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 2,
                  },
                ],
                enterFrom: "top",
                exitTo: "top",
              },
              {
                el: ".paneflow-block-GDwP51",
                col: 0,
                row: 2,
                widthCols: 4,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-QOO9NF",
                    translateX: "29.1cqw",
                    translateY: "-13cqw",
                    translateZ: 0,
                    rotate: "0deg",
                    scale: 2.5,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 2,
                  },
                ],
                enterFrom: "right",
                exitTo: "left",
              },
            ],
          },
          {
            cols: 4,
            rows: 3,
            blocks: [
              {
                el: ".paneflow-block-i6PExa",
                col: 0,
                row: 0,
                widthCols: 1,
                heightRows: 3,
                children: [
                  {
                    el: ".paneflow-item-jJRp4L",
                    translateX: 0,
                    translateY: 0,
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "right",
                exitTo: "left",
              },
              {
                el: ".paneflow-block-MdKkwa",
                col: 1,
                row: 0,
                widthCols: 3,
                heightRows: 3,
                children: [
                  {
                    el: ".paneflow-item-6U1vXq",
                    translateX: "3cqw",
                    translateY: "2.9cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                  {
                    el: ".paneflow-item-VHFydX",
                    translateX: "3cqw",
                    translateY: "14.7cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 1,
                  },
                  {
                    el: ".paneflow-item-q5D06m",
                    translateX: "3cqw",
                    translateY: "26.5cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 2,
                  },
                  {
                    el: ".paneflow-item-0o3H4n",
                    translateX: "3cqw",
                    translateY: "37.7cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 3,
                  },
                ],
                enterFrom: "right",
                exitTo: "right",
              },
            ],
          },
          {
            cols: 4,
            rows: 4,
            blocks: [
              {
                el: ".paneflow-block-GDwP51",
                col: 0,
                row: 0,
                widthCols: 4,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-QOO9NF",
                    translateX: "27.4cqw",
                    translateY: "-22.4cqw",
                    translateZ: 0,
                    rotate: "0deg",
                    scale: 2.5,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 2,
                  },
                ],
                enterFrom: "left",
                exitTo: "left",
              },
              {
                el: ".paneflow-block-fShcXX",
                col: 0,
                row: 2,
                widthCols: 1,
                heightRows: 1,
                children: [
                  {
                    el: ".paneflow-item-DzAVYq",
                    translateX: "0.1cqw",
                    translateY: "3.4cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "bottom",
                exitTo: "bottom",
              },
              {
                el: ".paneflow-block-ffc839",
                col: 1,
                row: 2,
                widthCols: 1,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-850leX",
                    translateX: "-1.8cqw",
                    translateY: "-2.1cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 2.2,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "bottom",
                exitTo: "bottom",
              },
              {
                el: ".paneflow-block-N4w44o",
                col: 2,
                row: 2,
                widthCols: 2,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-DCj6jr",
                    translateX: "0.7cqw",
                    translateY: "7cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "bottom",
                exitTo: "bottom",
              },
            ],
          },
          {
            cols: 4,
            rows: 4,
            blocks: [
              {
                el: ".paneflow-block-zOwZ9W",
                col: 0,
                row: 0,
                widthCols: 4,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-MTYjcJ",
                    translateX: "0cqw",
                    translateY: "0cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                  {
                    el: ".paneflow-item-BKvJ9h",
                    translateX: "13.9cqw",
                    translateY: "10.8cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1.01,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 2,
                  },
                ],
                enterFrom: "right",
                exitTo: "left",
              },
              {
                el: ".paneflow-block-gUoSPp",
                col: 0,
                row: 2,
                widthCols: 2,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-YQs3R0",
                    translateX: 0,
                    translateY: 0,
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "right",
                exitTo: "right",
              },
              {
                el: ".paneflow-block-k5q6ni",
                col: 2,
                row: 3,
                widthCols: 2,
                heightRows: 1,
                children: [
                  {
                    el: ".paneflow-item-6slc4g",
                    translateX: "7.9cqw",
                    translateY: "0.4cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "bottom",
                exitTo: "left",
              },
            ],
          },
          {
            cols: 4,
            rows: 4,
            blocks: [
              {
                el: ".paneflow-block-8UcSHi",
                col: 0,
                row: 0,
                widthCols: 2,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-YSJ8zO",
                    translateX: 0,
                    translateY: 0,
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "left",
                exitTo: "left",
              },
              {
                el: ".paneflow-block-0vV37D",
                col: 2,
                row: 0,
                widthCols: 2,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-V4asSM",
                    translateX: "2.8cqw",
                    translateY: "7.3cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 0.82,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "bottom-right",
                exitTo: "left",
              },
              {
                el: ".paneflow-block-dFFo5c",
                col: 0,
                row: 2,
                widthCols: 2,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-rP6EA4",
                    translateX: "12.2cqw",
                    translateY: "7.3cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "bottom-left",
                exitTo: "left",
              },
              {
                el: ".paneflow-block-N1dqdZ",
                col: 2,
                row: 2,
                widthCols: 2,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-APln07",
                    translateX: 0,
                    translateY: 0,
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "right",
                exitTo: "left",
              },
            ],
          },
          {
            cols: 4,
            rows: 4,
            blocks: [
              {
                el: ".paneflow-block-gY8zWb",
                col: 0,
                row: 0,
                widthCols: 2,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-eQooxE",
                    translateX: "5.7cqw",
                    translateY: "7.3cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "right",
                exitTo: "top",
              },
              {
                el: ".paneflow-block-hLbQdT",
                col: 2,
                row: 0,
                widthCols: 2,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-ARRmii",
                    translateX: 0,
                    translateY: 0,
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "right",
                exitTo: "top",
              },
              {
                el: ".paneflow-block-fUWski",
                col: 0,
                row: 2,
                widthCols: 2,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-JYqPOh",
                    translateX: 0,
                    translateY: 0,
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "left",
                exitTo: "top",
              },
              {
                el: ".paneflow-block-DKP3Ig",
                col: 2,
                row: 2,
                widthCols: 2,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-6xGoLy",
                    translateX: "6.3cqw",
                    translateY: "7.3cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "right",
                exitTo: "top",
              },
            ],
          },
          {
            cols: 5,
            rows: 4,
            blocks: [
              {
                el: ".paneflow-block-Eitl4y",
                col: 0,
                row: 0,
                widthCols: 3,
                heightRows: 1,
                children: [
                  {
                    el: ".paneflow-item-kNSKsh",
                    translateX: "3.2cqw",
                    translateY: "2.4cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "bottom-right",
                exitTo: "top",
              },
              {
                el: ".paneflow-block-fULAa1",
                col: 3,
                row: 0,
                widthCols: 2,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-XkoUtc",
                    translateX: 0,
                    translateY: 0,
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "right",
                exitTo: "top",
              },
              {
                el: ".paneflow-block-iQHrHL",
                col: 0,
                row: 2,
                widthCols: 5,
                heightRows: 2,
                children: [
                  {
                    el: ".paneflow-item-CE4Fds",
                    translateX: "8.6cqw",
                    translateY: "4.3cqw",
                    translateZ: 0,
                    rotate: 0,
                    scale: 1,
                    transformOrigin: "center",
                    opacity: 1,
                    parallax: 0,
                  },
                ],
                enterFrom: "bottom",
                exitTo: "top",
              },
            ],
          },
        ],
        intro: true,
        mousewheelControl: { enabled: true, axis: "y" },
        loop: false,
        keyboardControl: { enabled: true },
      });
    }
    return () => {
      if (paneFlowInstanceRef.current) {
        paneFlowInstanceRef.current.destroy();
      }
    };
  }, []);
  return (
    <div ref={paneFlowElRef} className="paneflow paneflow-amaranth-egret-191">
      <div className="paneflow-content">
        <div className="paneflow-block paneflow-block-GDwP51">
          <div className="paneflow-image paneflow-item-QOO9NF">
            <img src="https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D" />
          </div>
        </div>
        <div className="paneflow-block paneflow-block-MdKkwa">
          <div className="paneflow-text paneflow-item-6U1vXq">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">Crafted</div>
            </div>
          </div>
          <div className="paneflow-text paneflow-item-VHFydX">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">For</div>
            </div>
          </div>
          <div className="paneflow-text paneflow-item-q5D06m">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">Your</div>
            </div>
          </div>
          <div className="paneflow-text paneflow-item-0o3H4n">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">Journey</div>
            </div>
          </div>
        </div>
        <div className="paneflow-block paneflow-block-X5ym2S">
          <div className="paneflow-text paneflow-item-rrHNvD">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">
                Hospitality Perfection
              </div>
            </div>
          </div>
        </div>
        <div className="paneflow-block paneflow-block-zGDkry">
          <div className="paneflow-text paneflow-item-6bpSMj">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">
                Personally vetted,
                <br />
                Professionally approved.
              </div>
            </div>
          </div>
        </div>
        <div className="paneflow-block paneflow-block-ffc839">
          <div className="paneflow-image paneflow-item-850leX">
            <img src="https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>
        </div>
        <div className="paneflow-block paneflow-block-N4w44o">
          <div className="paneflow-text paneflow-item-DCj6jr">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">
                Experience is elevated and <br />
                smooth with the sophisticated <br />
                simplicity of expert curation
              </div>
            </div>
          </div>
        </div>
        <div className="paneflow-block paneflow-block-fShcXX">
          <div className="paneflow-text paneflow-item-DzAVYq">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">Curated</div>
            </div>
          </div>
        </div>
        <div className="paneflow-block paneflow-block-8UcSHi">
          <div className="paneflow-bg-image paneflow-item-YSJ8zO">
            <img src="https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>
        </div>
        <div className="paneflow-block paneflow-block-N1dqdZ">
          <div className="paneflow-bg-image paneflow-item-APln07">
            <img src="https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>
        </div>
        <div className="paneflow-block paneflow-block-0vV37D">
          <div className="paneflow-text paneflow-item-V4asSM">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">
                F&amp;B <br />
                Transformation
              </div>
            </div>
          </div>
        </div>
        <div className="paneflow-block paneflow-block-dFFo5c">
          <div className="paneflow-text paneflow-item-rP6EA4">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">
                Revenue <br />
                Growth
              </div>
            </div>
          </div>
        </div>
        <div className="paneflow-block paneflow-block-iQHrHL">
          <div className="paneflow-text paneflow-item-CE4Fds">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">
                Strategic. Creative. <br />
                Measurable.
              </div>
            </div>
          </div>
        </div>
        <div className="paneflow-block paneflow-block-fULAa1">
          <div className="paneflow-bg-image paneflow-item-XkoUtc">
            <img src="https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>
        </div>
        <div className="paneflow-block paneflow-block-Eitl4y">
          <div className="paneflow-text paneflow-item-kNSKsh">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">Our Approach</div>
            </div>
          </div>
        </div>
        <div className="paneflow-block paneflow-block-zOwZ9W">
          <div className="paneflow-text paneflow-item-MTYjcJ">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">
                Hospitality Consultant
              </div>
            </div>
          </div>
          <div className="paneflow-text paneflow-item-BKvJ9h">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">
                Comprehensive hotel services including <br />
                operational audits, F&amp;B transformation, <br />
                and turnkey development for discerning clients.
              </div>
            </div>
          </div>
        </div>
        <div className="paneflow-block paneflow-block-gUoSPp">
          <div className="paneflow-bg-image paneflow-item-YQs3R0">
            <img src="https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>
        </div>
        <div className="paneflow-block paneflow-block-k5q6ni">
          <div className="paneflow-text paneflow-item-6slc4g">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">
                Operational
                <br />
                &nbsp;Excellence
              </div>
            </div>
          </div>
        </div>
        <div className="paneflow-block paneflow-block-hLbQdT">
          <div className="paneflow-bg-image paneflow-item-ARRmii">
            <img src="https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>
        </div>
        <div className="paneflow-block paneflow-block-fUWski">
          <div className="paneflow-bg-image paneflow-item-JYqPOh">
            <img src="https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>
        </div>
        <div className="paneflow-block paneflow-block-gY8zWb">
          <div className="paneflow-text paneflow-item-eQooxE">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">
                Turnkey
                <br />
                Development
              </div>
            </div>
          </div>
        </div>
        <div className="paneflow-block paneflow-block-DKP3Ig">
          <div className="paneflow-text paneflow-item-6xGoLy">
            <div className="paneflow-text-container">
              <div className="paneflow-text-content">
                Global
                <br />
                Partnerships
              </div>
            </div>
          </div>
        </div>
        <div className="paneflow-block paneflow-block-i6PExa">
          <div className="paneflow-bg-image paneflow-item-jJRp4L">
            <img src="https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>
        </div>
      </div>
    </div>
  );
}
