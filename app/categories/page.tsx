import React from 'react'
import CategoryTitle from '../components/categories/heading/heading'
import CategoryCarousel from '../components/categories/carousel/carousel'
import Gents from '../components/categories/gents/gents'
import Ladies from '../components/categories/ladies/ladies'
import Kids from '../components/categories/kids/kids'

function Categories() {
  return (
    <>
      <CategoryTitle/>
      <CategoryCarousel/>
      <Gents/>
      <Ladies/>
      <Kids/>
    </>
  )
}

export default Categories
