"use client"
import React from 'react'
import { Shader3 } from './Shader3'
import { motion } from 'motion/react'

function HomeClient() {
  return (
    <div className='relative h-screen'>
        <Shader3 />
        <motion.div className='fixed top-0 left-0 w-full h-20 z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'>
            <div className=''>
                <div>Echo:AI Customer Support</div>
            </div>
        </motion.div>
    </div>
  )
}

export default HomeClient