export default function SideBare()
{
    return (
        <aside>
          <div className='top-items'>
            <a href="../" className='name'>
              {/* <div className='img'></div> */}
              <div className='text'>
                <b>Tavlia</b>
              </div>
            </a>
            <a href="../" className='aside-item'>
              <div className='icon'></div>
              <div className='text'>
                Play
              </div>
            </a>
            <a href="" className='aside-item'>
              <div className='icon'></div>
              <div className='text'>
                Instractions
              </div>
            </a>
            <a href="" className='aside-item'>
              <div className='icon'></div>
              <div className='text'>
                Profile
              </div>
            </a>
            <a href="" className='aside-item'>
              <div className='icon'></div>
              <div className='text'>
                Rank
              </div>
            </a>
            <a href="" className='aside-item'>
              <div className='icon'></div>
              <div className='text'>
                Friends
              </div>
            </a>
            <a href="" className='aside-item'>
              <div className='icon'></div>
              <div className='text'>
                Settings
              </div>
            </a>
          </div>
          <div className='down-items'>
            <a href="instraction" className='aside-item'>
              <div className='icon'></div>
              <div className='text'>
                Help
              </div>
            </a>
          </div>
        </aside>
    );
}