/* eslint-disable max-len,import/no-unresolved */
import { useSelector } from 'react-redux';
import React from 'react';
import Link from 'next/Link';
import TeamsConnectPlug from './teams/TeamsConnectPlug';
import { getPublicAssetPath } from '../../lib/assetHelper';
import styles from './ConnectCard.module.scss';
import Router, {useRouter} from "next/router";

const ConnectCard = () => {
  const { connect } = useSelector((state) => state);

  const handleClick = (data) => {
    Router.push(`/${data.name}`, `/${data.name}`);
  };

  return (<>
    <div className={styles.container}>

      {/* 배너 영역 */}
      <div className={styles.banner}>
        <div className={styles.txt_wrap}>
          <p>잔디 커넥트를 처음 사용하시나요? 이제 Google 캘린더, Trello, GitHub, JIRA 등을 연동하여 잔디에서 알림을 받아보세요.</p>
          <span>이제 Google 캘린더, Trello, GitHub, JIRA 등을 연동하여 잔디에서 알림을 받아보세요.</span>
        </div>
        <button className={`${styles.btn} ${styles.green}`}>더 알아보기</button>
      </div>
      
      {/* 신규 서비스 */}
      <h2 className='title'>신규 서비스</h2>
      <div className={`${styles.connect_card_wrap} ${styles.type_list_new}`}>
        <div className={styles.connect_card} >
          <div className={styles.imgBox}>
            <img src={getPublicAssetPath('static/icon_notion.png')} alt="notion"></img>
          </div>
          <div className={styles.inner}>
            <strong>Notion</strong>
            <p>Notion 문서의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button className={`${styles.btn} ${styles.gray} ${styles.full}`}>연동하기</button>
          </div>
        </div>
        <div className={styles.connect_card} >
          <div className={styles.imgBox}>
            <img src={getPublicAssetPath('static/icon_figma.png')} alt="figma"></img>
          </div>
          <div className={styles.inner}>
            <strong>Figma</strong>
            <p>figma 문서의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button className={`${styles.btn} ${styles.gray} ${styles.full}`}>연동하기</button>
          </div>
        </div>
        <div className={styles.connect_card} >
          <div className={`${styles.imgBox} ${styles.asana}`}>
            <img src={getPublicAssetPath('static/icon_asana.png')} alt="asana"></img>
          </div>
          <div className={styles.inner}>
            <strong>Asana</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button className={`${styles.btn} ${styles.gray} ${styles.full}`}>연동하기</button>
          </div>
        </div>
      </div>

      {/* 커넥트 목록 */}
      <h2 className='title'>신규 서비스</h2>
      <div className={`${styles.connect_card_wrap} ${styles.type_list}`}>
        <div className={styles.connect_card} >
          <div className={styles.inner}>
            <img src="" className={styles.img}></img>
            <strong>Notion</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button className={`${styles.btn} ${styles.gray} ${styles.small}`}>연동하기</button>
          </div>
        </div>
        <div className={styles.connect_card} >
          <div className={styles.inner}>
            <img src="" className={styles.img}></img>
            <strong>Notion</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button className={`${styles.btn} ${styles.gray} ${styles.small}`}>연동하기</button>
          </div>
        </div>
        <div className={styles.connect_card} >
          <div className={styles.inner}>
            <img src="" className={styles.img}></img>
            <strong>Notion</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button className={`${styles.btn} ${styles.gray} ${styles.small}`}>연동하기</button>
          </div>
        </div>
        <div className={styles.connect_card} >
          <div className={styles.inner}>
            <img src="" className={styles.img}></img>
            <strong>Notion</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button className={`${styles.btn} ${styles.gray} ${styles.small}`}>연동하기</button>
          </div>
        </div>
        <div className={styles.connect_card} >
          <div className={styles.inner}>
            <img src="" className={styles.img}></img>
            <strong>Notion</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button className={`${styles.btn} ${styles.gray} ${styles.small}`}>연동하기</button>
          </div>
        </div>
        <div className={styles.connect_card} >
          <div className={styles.inner}>
            <img src="" className={styles.img}></img>
            <strong>Notion</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button className={`${styles.btn} ${styles.gray} ${styles.small}`}>연동하기</button>
          </div>
        </div>
        <div className={styles.connect_card} >
          <div className={styles.inner}>
            <img src="" className={styles.img}></img>
            <strong>Notion</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button className={`${styles.btn} ${styles.gray} ${styles.small}`}>연동하기</button>
          </div>
        </div>
        <div className={styles.connect_card} >
          <div className={styles.inner}>
            <img src="" className={styles.img}></img>
            <strong>Notion</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button className={`${styles.btn} ${styles.gray} ${styles.small}`}>연동하기</button>
          </div>
        </div>
      </div>
      {/*<div className={`${styles.connect_card_wrap} ${styles.type_list}`}>
        { connect.connects && connect.connects.map((data, i) => (
            <div className={styles.connect_card} key={i} >
              <div className={styles.inner}>
                <img src={data.botThumbnail} className={styles.img}></img>
                <strong>{data.label}</strong>
                <p>{data.text}</p>
                <button className={`${styles.btn} ${styles.gray} ${styles.small}`} onClick={() => handleClick(data)}>연동하기</button>
              </div>
            </div>
        )) }
      </div>*/}
    </div>
  </>);
};
export default ConnectCard;
