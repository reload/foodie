import React from "react";
import styled from '@emotion/styled'
import { Div, P } from '../../layouts/layout'
import { headerCardPrimary, headerCardSecondary, headerCardTiny, headerSliderNavigation } from '../../components/typography'
import { colors, shadows } from '../../../style/theme'
import { IconKcal } from '../../../img/icons/Icons'
import { Link } from 'react-router-dom'

import imgDessert1 from '../../../img/images/dessert1.png'
import imgDessert2 from '../../../img/images/dessert2.png'
import imgDessert3 from '../../../img/images/dessert3.png'

import Image from '../../components/image'

import { useQuery } from "urql"
import gql from 'graphql-tag'
import { api } from "../../api/util"

const SliderNavigationItem = styled(Link)({
  ...headerSliderNavigation,
  marginRight: "20px",
  paddingBottom: "8px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  whiteSpace: "nowrap" 
})

const SliderNavigationBar = styled(Div)(({active}) => ({
  width: "60%",
  height: "2px",
  backgroundColor: active ? colors.themeRed2 : "transparent",
  borderRadius: "4px"
}))

const SliderContainer = styled(Div)({
  scrollSnapType: "mandatory",
  scrollPaddingLeft: "20px",
  scrollPaddingRight: "20px",
  scrollSnapType: "x mandatory",
  overflowX: "scroll",
  "-webkit-overflow-scrolling": "touch",
  flex: 1
})

const SliderItem = styled(Div)({
    display: "block",
    minWidth: "140px",
    borderRadius: "10px",
    boxShadow: shadows.cardShadow,
    margin: "0px 10px",
    backgroundColor: "white",
    "scrollSnapAlign": "start",
    "&:first-child": {
      marginLeft: "20px"
    },
    "&:last-child": {
      marginRight: "20px"
    }
})

const getCategories = gql`
{
  categories {
    id
    title
    recipes {
      id
      title
      calories
      suggested_price
      image {
        url
      }
    }
  }
}
`

const HomeSlider = () => {
    const [res] = useQuery({
      query: getCategories
    })
    const ready = !res.fetching && !res.error
    return (
      <Div width="100vw"  flexDirection={"column"}>

        <Div
          style={{
            overflow: "scroll"
          }}
          p={4}
          pb={0}
        >
            {
              ready && res.data.categories.map(({id, title}, index) => (
                <SliderNavigationItem 
                  key={id}
                  to={"/"}>
                  <P pb={"6px"}>{title}</P>
                  <SliderNavigationBar active={index === 0} />
                </SliderNavigationItem> 
              ))
            }
        </Div>

        <Div style={{overflow: "scroll"}}>
          <SliderContainer py={4} pt={2}>
            {
              ready && res.data.categories[0].recipes.map(recipe => {
                  return <SliderItem p={2} key={recipe.id}>
                    <Image src={api(recipe.image.url)} style={{width: "100%", height: "100px", objectFit: "cover"}} alt=""/>
                    <P style={headerCardPrimary}>{recipe.title}</P>
                    <P style={headerCardSecondary}>{recipe.suggested_price ? '$' + recipe.suggested_price : ''}</P>
                    <Div mt={1}>
                      <IconKcal />
                      <P ml="5px" style={{...headerCardTiny, lineHeight: "16px"}}>{recipe.calories + " kcal"}</P>
                    </Div>
                  </SliderItem>
              })
            }
          </SliderContainer>
        </Div>

      </Div>
    )
  }

export default HomeSlider