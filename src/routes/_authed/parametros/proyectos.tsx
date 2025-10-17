import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/parametros/proyectos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/parametros/proyectos"!</div>
}
