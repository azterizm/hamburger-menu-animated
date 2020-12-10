import { ReactElement, useState } from 'react'
import { a, useSpring, useTrail } from 'react-spring'
import beaker from './assets/iconfinder_beaker_lab_research_chemistry_3005772.svg'
import bell from './assets/iconfinder_bell_2199103.svg'
import download from './assets/iconfinder_import-download-save_2931171.svg'
import message from './assets/iconfinder_message-circle_2561249.svg'
import multimedia from './assets/iconfinder_multimedia-06_2849830.svg'

const App = () => {
  const [menuStatus, setMenuStatus] = useState<boolean>(false)

  const menuElems: ReactElement[] = [
    <embed type="image/svg+xml" className='message' src={message} width='24' height='24' />,
    <embed type="image/svg+xml" className='multimedia' src={multimedia} width='24' height='24' />,
    <embed type="image/svg+xml" className='beaker' src={beaker} width='24' height='24' />,
    <embed type="image/svg+xml" className='bell' src={bell} width='24' height='24' />,
    <embed type="image/svg+xml" className='download' src={download} width='24' height='24' />
  ]

  const [menuTrail, setTrail] = useTrail(menuElems.length, () => ({
    opacity: 0
  }))

  if (menuStatus) setTrail({ opacity: 1 })
  else setTrail({ opacity: 0, config: { tension: 300 } })

  const contentWidth = useSpring({
    width: menuStatus ? 325 : 0
  })

  const menu1Props = useSpring({
    r: menuStatus ? 45 : 0,
    t: menuStatus ? 50 : 23
  })

  const menu2Props = useSpring({
    r: menuStatus ? 45 : 0,
    l: menuStatus ? 31 : 30
  })

  const menu3Props = useSpring({
    r: menuStatus ? -45 : 0,
    t: menuStatus ? 50 : 63
  })

  return (
    <div className="container">
      <header>
        <div onClick={() => setMenuStatus(e => !e)} className="menu">
          <a.div style={{
            rotate: menu1Props.r.to(r => `${r}deg`),
            top: menu1Props.t.to(t => `${t}%`)
          }} />
          <a.div style={{
            rotate: menu2Props.r.to(r => `${r}deg`),
            left: menu2Props.l.to(l => `${l}%`)
          }} />
          <a.div style={{
            rotate: menu3Props.r.to(r => `${r}deg`),
            top: menu3Props.t.to(t => `${t}%`)
          }} />
        </div>
        <a.div style={contentWidth as any} className="content">
          {menuTrail.map((props, i) => (
            <a.div style={props as any} className="item">
              {menuElems[i]}
            </a.div>
          ))}
        </a.div>
      </header>
    </div>
  )
}

export default App
