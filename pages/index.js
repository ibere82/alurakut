import React from 'react';
import nookies from 'nookies';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home({ githubID, githubUser }) {
  const [userObject, setUserObject] = React.useState({});
  const [comunidades, setComunidades] = React.useState([]);
  const [pessoasDaComunidade, setPessoasDaComuniodade] = React.useState([]);


  React.useEffect(() => {
    (async () => {
      const ft = await fetch('/api/getuser/' + githubID + '/' + githubUser)
      const resp = await ft.json()
      setUserObject(() => resp)

      Promise.all([
        fetch(`https://api.github.com/users/${resp.userName}/following`).then(resp => resp.json()),
        fetch(`https://api.github.com/users/${resp.userName}/followers`).then(resp => resp.json())
      ]).then(resp => {
        const collection = new Set(resp[0].concat(resp[1]))
        const friends = Array.from(collection).map(({ login }) => login)
        setPessoasDaComuniodade(friends)
      })
    })()
  }, [])

  React.useEffect(() => {
    if (!!userObject.id) {
      fetch('/api/loadcomunities/' + userObject.id).then(resp => resp.json()).then(
        resp =>
          setComunidades(resp)
      )
    }
  }, [userObject])

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={userObject.userName} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet
              recados={userObject.recados}
              fotos={userObject.fotos}
              videos={userObject.videos}
              fas={userObject.fas}
              mensagens={userObject.mensagens}
              confiavel={userObject.confiavel}
              legal={userObject.legal}
              sexy={userObject.sexy}
            />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorId: userObject.id,
              }
              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
                .then(async (response) => {
                  const dados = await response.json();
                  const comunidadesAtualizadas = [...comunidades, dados];
                  setComunidades(comunidadesAtualizadas)
                })
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasDaComunidade.length})
            </h2>

            <ul>
              {pessoasDaComunidade.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const githubID = cookies.USER_ID
  const githubUser = cookies.USER_NAME

  if (!githubUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      githubUser,
      githubID
    }
  }
}

