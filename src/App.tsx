import Layout from './components/common/Layout.tsx'
import './App.css'

function App() {
  return (
      <Layout>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">¡Sidebar funcionando!</h2>
            <p className="text-muted-foreground">
              Esta es tu aplicación con el sidebar de shadcn/ui funcionando.
              Puedes colapsar el sidebar usando el botón en el header o con
              Cmd+B (Mac) / Ctrl+B (Windows).
            </p>
          </div>
        </div>
      </Layout>
  )
}

export default App