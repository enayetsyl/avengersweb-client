import { AnimatePresence, motion } from 'framer-motion';


const containerVariants = {
  hidden: {
    opacity:0,
  },
  visible: {
    opacity: 1, 
    transition: {delay: 1.5, duration: 1.5}
  },
  exit: {
    x:'-100vw',
    transition: {ease: 'easeInOut'}
  }
}

const AnimatedRoute =({element}) => (
  <AnimatePresence wait>
    <motion.div
    variants={containerVariants}
    initial='hidden'
    animate='visible'
    exit='exit'
    >
      {element}
    </motion.div>

  </AnimatePresence>
)

export default AnimatedRoute;