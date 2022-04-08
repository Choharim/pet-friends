import styled from '@emotion/styled'
import Layout from 'components/layout/layout'
import { ICON_CDN_URL, pageNames } from 'constants/common'
import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

const FIELD = [
  {
    title: '상품',
    category: [
      {
        name: '간식',
        iconUrl: '512/784/784062.png',
        url: `${pageNames.SHOP}?category=snake`,
      },
      {
        name: '음료',
        iconUrl: '512/3081/3081956.png',
        url: `${pageNames.SHOP}?category=drink`,
      },
      {
        name: '식사',
        iconUrl: '512/4491/4491049.png',
        url: `${pageNames.SHOP}?category=dish`,
      },
    ],
  },
  {
    title: 'OneDay 요리수업',
    category: [
      {
        name: '초급',
        iconUrl: '512/7218/7218599.png',
        url: `${pageNames.CLASS}?category=beginner`,
      },
      {
        name: '중급',
        iconUrl: '512/3202/3202822.png',
        url: `${pageNames.CLASS}?category=intermediate`,
      },
      {
        name: '고급',
        iconUrl: '512/1980/1980708.png',
        url: `${pageNames.CLASS}?category=advanced`,
      },
    ],
  },
]

const Home: NextPage = () => {
  return (
    <Layout title="home">
      <PageWrapper>
        <Top>
          <Intro>{'안녕하세요.\n펫프렌즈입니다.'}</Intro>
          {FIELD.map((fieldData, i) => {
            const { title, category } = fieldData

            return (
              <CategorySection key={`category_menu_${fieldData.title}-${i}`}>
                <CategoryTitle>{title}</CategoryTitle>
                <CategoryContainer>
                  {category.map((categoryData, i) => {
                    const { name, iconUrl, url } = categoryData

                    return (
                      <Link key={`category_${name}-${i}`} href={url}>
                        <a>
                          <CategoryButton>
                            <CategoryIcon src={`${ICON_CDN_URL}/${iconUrl}`} />
                            <CategoryName>{name}</CategoryName>
                          </CategoryButton>
                        </a>
                      </Link>
                    )
                  })}
                </CategoryContainer>
              </CategorySection>
            )
          })}
        </Top>
      </PageWrapper>
    </Layout>
  )
}

export default Home

const Intro = styled.strong`
  ${({ theme }) => theme.fonts.HEADER_3};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.BLACK_2};
  white-space: pre-wrap;
`
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 25px;
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0 16px;
`

const CategorySection = styled.section`
  display: grid;
  grid-auto-rows: auto auto;
  gap: 10px;
  margin-top: 20px;
`
const CategoryTitle = styled.h2`
  ${({ theme }) => theme.fonts.SUB_TITLE_3};
  color: ${({ theme }) => theme.colors.BLACK_5};
`

const CategoryContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const CategoryButton = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 90px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.MAIN_1};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.MAIN_2};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.MAIN_3};
  }
`

const CategoryIcon = styled.img`
  width: 32px;
`

const CategoryName = styled.span`
  ${({ theme }) => theme.fonts.BODY_4};
  color: ${({ theme }) => theme.colors.BLACK_5};
  margin-top: 3px;
`
