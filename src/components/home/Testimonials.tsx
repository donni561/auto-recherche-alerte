
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sophie Dupont",
      role: "Acheteuse de Renault Clio",
      testimonial: "Grâce à AutoSearch, j'ai trouvé ma Clio en moins de deux semaines. Un concessionnaire m'a contactée avec exactement ce que je cherchais !",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Thomas Bernard",
      role: "Acheteur de Peugeot 3008",
      testimonial: "Je cherchais un 3008 avec des options spécifiques depuis des mois. Avec AutoSearch, j'ai reçu trois propositions en une semaine.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Jean Dujardin",
      role: "Concessionnaire automobile",
      testimonial: "Cette plateforme nous permet de cibler directement des acheteurs intéressés par nos véhicules. Un gain de temps précieux !",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ils nous font confiance</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez ce que nos utilisateurs disent de notre service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow">
              <div className="flex flex-col h-full">
                <p className="italic text-gray-600 mb-6 flex-grow">"{testimonial.testimonial}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
