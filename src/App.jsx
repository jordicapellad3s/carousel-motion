import { useState } from "react";
import * as Icons from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

function App() {
  const [count, setCount] = useState(0);
  let [ref, { width }] = useMeasure();
  let [tuple, setTuple] = useState([null, count]);

  if (tuple[1] !== count) {
    setTuple([tuple[1], count]);
  }

  let prev = tuple[0];
  let direction = count > prev ? 1 : -1;

  return (
    <div className="text-white p-20">
      <div className="flex justify-between">
        <button onClick={() => setCount(count - 1)}>
          <Icons.ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button onClick={() => setCount(count + 1)}>
          <Icons.ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-8 flex justify-center">
        <div
          ref={ref}
          className="relative h-24 w-40 bg-gray-700 flex justify-center items-center overflow-hidden"
        >
          <AnimatePresence custom={{ direction, width }}>
            <motion.div
              key={count}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={{ direction, width }}
              className={`absolute w-20 h-20 ${
                colors[Math.abs(count % 4)]
              } flex justify-center items-center`}
            >
              {count}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

let variants = {
  enter: ({ direction, width }) => ({ x: direction * width }),
  center: { x: 0 },
  exit: ({ direction, width }) => ({ x: direction * -width }),
};

let colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500"];

export default App;
