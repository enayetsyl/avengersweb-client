import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"

const Modal = ({showModal, setShowModal}) => {
  const backdrop = {
    visible: {opacity:1},
    hidden: {opacity: 0}
  }

  const modal = {
    hidden: {y: '100vh', opacity: 0},
    visible: {y: '200px', opacity: 1},
    transition: {delay: 0.5}
  }

  return (
    <AnimatePresence >
      {
        showModal && (
          <motion.div
          className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10"
          variants={backdrop}
          initial='hidden'
          animate='visible'
          exit='hidden'
          >
            <motion.div
            variants={modal}
            className="max-w-[400px] mx-auto px-10 py-5 bg-white rounded-lg text-center text-sm"
            >
              <h3 className="text-[#444] font-bold">Want to know about this website. This is protected so can not browse without permission.</h3>
              
              <h4 className="text-[#444] font-bold py-4">Please watch this <Link to={'https://www.youtube.com/watch?v=N6d0uACGOVY'} target="_blank"
              className="underline text-green-500"
              >video</Link> to get a virtual tour.</h4>
              <h4 className="text-[#444] font-bold">or you can also read this <Link
              to={'https://medium.com/@enayetflweb/part-23-unveiling-the-power-of-material-ui-sx-props-c2740b1e7049'} target="_blank"
              className="underline text-green-500"
              >blog.</Link></h4>
              <Link to={'/'}>
              <button className="text-[#444] font-bold border border-[#444] mt-5 p-2 rounded-lg"
              onClick={() => setShowModal(false)}
              >I am an insider</button>
              </Link>
            </motion.div>

          </motion.div>
        )
      }
    </AnimatePresence>
    )
}

export default Modal