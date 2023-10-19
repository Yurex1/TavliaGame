function SideBareItems({text, hrefText} : any) {
  return (<a href={hrefText} className='aside-item'>
    <div className='icon'></div>
    <div className='text'>
      {text}
    </div>
  </a>);
}

export default function SideBare() {
  return (
    <aside>
      <div className='top-items'>
        <a href="../" className='name'>
          {/* <div className='img'></div> */}
          <div className='text'>
            <b>Tavlia</b>
          </div>
        </a>
        <SideBareItems text="Play" hrefText="../"/>
        <SideBareItems text="Instraction" hrefText="../"/>
        <SideBareItems text="Profile" hrefText="../"/>
        <SideBareItems text="Rank" hrefText="../"/>
        <SideBareItems text="Friends" hrefText="../"/>
        <SideBareItems text="Settings" hrefText="../"/>
      </div>
      <div className='down-items'>
        <SideBareItems text="Help" hrefText="../"/>
      </div>
    </aside>
  );
}