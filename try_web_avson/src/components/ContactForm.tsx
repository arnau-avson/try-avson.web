import { useState } from "react";
import { Mail, MapPin, Clock, CheckCircle } from "lucide-react";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        organization: "",
        area: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.email) {
            alert("Completa los campos obligatorios");
            return;
        }
        console.log(formData);
        alert("Solicitud enviada correctamente");
    };

    return (
        <section className="relative min-h-screen bg-gray-900 flex items-center justify-center p-6">
            {/* Fondo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.18),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.18),transparent_40%)]" />

            <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FORMULARIO */}
                <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10">
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        Solicita tu sesión estratégica
                    </h2>

                    <div className="space-y-5">
                        {/* Nombre */}
                        <div>
                            <label className="text-sm text-white/70">
                                Nombre completo <span className="text-red-400">*</span>
                            </label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tu nombre"
                                className="mt-2 w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm text-white/70">
                                Email corporativo <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="nombre@empresa.com"
                                className="mt-2 w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Organización */}
                        <div>
                            <label className="text-sm text-white/70">Organización</label>
                            <input
                                name="organization"
                                value={formData.organization}
                                onChange={handleChange}
                                placeholder="Nombre de tu organización"
                                className="mt-2 w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-white"
                            />
                        </div>

                        {/* Área estratégica */}
                        <div>
                            <label className="text-sm text-white/70">
                                Área de interés estratégico
                            </label>
                            <select
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-white"
                            >
                                <option value="">Selecciona área estratégica</option>
                                <option value="ciberseguridad">Ciberseguridad</option>
                                <option value="grc">GRC & Cumplimiento</option>
                                <option value="ia">IA aplicada</option>
                                <option value="resiliencia">Resiliencia operativa</option>
                            </select>
                        </div>

                        {/* Desafíos */}
                        <div>
                            <label className="text-sm text-white/70">
                                Desafíos estratégicos
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe tus principales desafíos organizacionales..."
                                className="mt-2 w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-white resize-none"
                            />
                        </div>

                        {/* CTA */}
                        <button
                            onClick={handleSubmit}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-6 py-3 rounded-xl"
                        >
                            Solicitar sesión estratégica
                        </button>
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="space-y-6">
                    {/* Contacto directo */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
                        <h3 className="text-white font-semibold mb-4">
                            Contacto directo
                        </h3>
                        <ul className="space-y-3 text-white/70 text-sm">
                            <li className="flex gap-3 items-center">
                                <Mail className="w-4 h-4" /> hello@avson.eu
                            </li>
                            <li className="flex gap-3 items-center">
                                <MapPin className="w-4 h-4" /> Madrid & Barcelona
                            </li>
                            <li className="flex gap-3 items-center">
                                <Clock className="w-4 h-4" /> 24–48 horas
                            </li>
                        </ul>
                    </div>

                    {/* Qué puedes esperar */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
                        <h3 className="text-white font-semibold mb-4">
                            ¿Qué puedes esperar?
                        </h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            {[
                                "Análisis estratégico personalizado",
                                "Roadmap claro hacia la resiliencia",
                                "Propuesta de valor alineada a objetivos",
                                "Metodologías probadas en líderes",
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 items-start">
                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
