import { useState } from "react";
import "./index.css";

export default function ChatbotPrototype() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hoi! Hoe kan ik je vandaag helpen? Ben je op zoek naar opdrachten als zzp’er of zoek je als bedrijf naar capaciteit?" },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState("start");
  const [formData, setFormData] = useState({});

  const nextBotQuestion = (newStep) => {
    const vragen = {
      vraag_branche: "In welke branche is je bedrijf actief?",
      vraag_bedrijfsnaam: "Wat is je bedrijfsnaam?",
      vraag_email: "Wat is het e-mailadres waar we je op kunnen bereiken?",
      vraag_opdrachtomschrijving: "Wat is de opdrachtomschrijving?",
      vraag_musthaves: "Wat zijn de technische must-haves voor deze opdracht?",
      vraag_nicetohaves: "Wat zijn de technische nice-to-haves?",
      vraag_startdatum: "Per wanneer moet deze persoon starten?",
      vraag_uren: "Voor hoeveel uur per week is het?",
      vraag_duur: "Wat is de geschatte duur van de opdracht (in maanden)?",
      vraag_tarief: "Zijn er bepaalde tariefkaders waar we rekening mee moeten houden?",
      vraag_locatie: "Wat is de locatie van de opdracht?",
      vraag_remote: "Is de opdracht remote/hybride of op locatie?",
      vraag_team: "Hoe ziet de teamsamenstelling eruit?",
      zzp_naam: "Wat is je volledige naam?",
      zzp_email: "Wat is je e-mailadres?",
      zzp_linkedin: "Wat is je LinkedIn-profiel (URL)?",
      zzp_rol: "Wat voor rol of functie zoek je?",
      zzp_beschikbaar: "Vanaf wanneer ben je beschikbaar?",
      zzp_cv: "Wil je je CV uploaden of een link delen?",
    };
    return vragen[newStep] || "Bedankt! We nemen spoedig contact met je op.";
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const lower = input.toLowerCase();
    let botResponse = "";
    const updatedForm = { ...formData };

    if (step === "start") {
      if (lower.includes("capaciteit")) {
        botResponse = "Top! Dan help ik je met de capaciteitsaanvraag.";
        setStep("vraag_branche");
      } else if (lower.includes("opdracht")) {
        botResponse = "Je wilt je inschrijven als zzp’er? Super! Laten we starten.";
        setStep("zzp_naam");
      } else {
        botResponse = "Kies 'capaciteit' of 'opdrachten'.";
      }
    }

    const stepsCapaciteit = [
      "vraag_branche", "vraag_bedrijfsnaam", "vraag_email", "vraag_opdrachtomschrijving",
      "vraag_musthaves", "vraag_nicetohaves", "vraag_startdatum", "vraag_uren",
      "vraag_duur", "vraag_tarief", "vraag_locatie", "vraag_remote", "vraag_team"
    ];

    const stepsZZP = [
      "zzp_naam", "zzp_email", "zzp_linkedin", "zzp_rol", "zzp_beschikbaar", "zzp_cv"
    ];

    if (stepsCapaciteit.includes(step) || stepsZZP.includes(step)) {
      updatedForm[step] = input;
      setFormData(updatedForm);
      const steps = stepsCapaciteit.includes(step) ? stepsCapaciteit : stepsZZP;
      const currentIdx = steps.indexOf(step);
      const nextStep = steps[currentIdx + 1] || "klaar";
      setStep(nextStep);
      botResponse = nextBotQuestion(nextStep);
    }

    if (step === "klaar") {
      botResponse = nextBotQuestion("klaar");
      console.log("Ingevulde data:", formData);
    }

    setMessages((prev) => [...prev, { from: "bot", text: botResponse }]);
    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-2xl shadow-xl">
      <h2 className="text-xl font-bold mb-4">🤖 Intake Chatbot</h2>
      <div className="h-96 overflow-y-auto space-y-2 border p-3 rounded-lg bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm p-2 rounded-xl max-w-[80%] ${
              msg.from === "bot"
                ? "bg-blue-100 text-left"
                : "bg-green-100 text-right self-end ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          className="flex-grow border rounded px-2 py-1"
          placeholder="Typ je bericht..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-1 rounded">
          Verstuur
        </button>
      </div>
    </div>
  );
}
