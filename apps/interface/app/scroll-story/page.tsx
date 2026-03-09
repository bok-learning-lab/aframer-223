import { ScrollVideoPlayer } from "@/components/scroll-video-player";
import Link from "next/link";

export const metadata = {
  title: "Scroll Story",
};

function Quote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution: string;
}) {
  return (
    <blockquote className="border-l-2 border-border/60 pl-4 my-6">
      <p className="text-sm leading-relaxed text-foreground/90 italic">
        {children}
      </p>
      <cite className="block mt-2 text-xs text-muted-foreground not-italic">
        {attribution}
      </cite>
    </blockquote>
  );
}

export default function ScrollStoryPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Back link */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back
      </Link>

      {/* ──────────────────────────────────────────────────────── */}
      {/* Opening Frame */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 max-w-2xl mx-auto text-center">
        <div className="space-y-8">

          <p className="text-lg leading-relaxed text-foreground/80">
            What does it mean to look at an image of someone else&apos;s life?
          </p>

          <p className="text-lg leading-relaxed text-foreground/80">
            What happens when that image is reactivated—extended, animated,
            or reinterpreted through contemporary tools?
          </p>

          <p className="text-sm leading-relaxed text-muted-foreground max-w-lg mx-auto">
            The photographs on these pages originate in a private archive.
            They record ordinary moments: domestic spaces, family gatherings,
            informal portraits. They were not produced as historical documents.
          </p>

          <p className="text-sm leading-relaxed text-muted-foreground max-w-lg mx-auto">
            Here, they are set into motion using contemporary image-generation
            systems. Motion, however, is not neutral. It introduces interpretation,
            interpolation, and invention.
          </p>

          <p className="text-sm leading-relaxed text-muted-foreground max-w-lg mx-auto">
            The accompanying texts address a related problem: how lives become
            legible through archives, images, and research. Scholars of history,
            anthropology, and Black studies have long noted that the desire to
            document and explain other people&apos;s lives is never purely descriptive.
            It is also a structure of power.
          </p>

          <p className="text-sm leading-relaxed text-muted-foreground max-w-lg mx-auto">
            Rather than resolving that tension, this project places it in view.
            The materials that follow move between documentation, interpretation,
            and speculation. They ask what becomes visible in the process—and
            what necessarily remains opaque.
          </p>

        </div>

        <p className="mt-16 text-xs text-muted-foreground/60 animate-pulse">
          Scroll to begin
        </p>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* Section One: The Requirement of Transparency */}
      {/* ──────────────────────────────────────────────────────── */}
      <ScrollVideoPlayer
        videoSrc="/videos/catacomb_a_vintage_photograph--_the_person_or_people_come_to__859af4c2-432d-402e-a447-e750ef1151a1_0.mp4"
      >
        <h2 className="text-lg font-semibold tracking-tight mb-6 text-foreground/60 uppercase">
          The Requirement of Transparency
        </h2>
        <Quote attribution='Édouard Glissant, For Opacity (1989)'>
          &ldquo;If we examine the process of &lsquo;understanding&rsquo; people
          and ideas from the perspective of Western thought, we discover that its
          basis is this requirement for transparency. In order to understand and
          thus accept you, I have to measure your solidity with the ideal scale
          providing me with grounds to make comparisons and, perhaps, judgments. I
          have to reduce.&rdquo;
        </Quote>
        <Quote attribution='Édouard Glissant, For Opacity (1989)'>
          &ldquo;Accepting differences does, of course, upset the hierarchy of
          this scale. I understand your difference, or in other words, without
          creating a hierarchy, I relate it to my norm. I admit you to existence,
          within my system. I create you afresh. —But perhaps we need to bring an
          end to the very notion of a scale. Displace all reduction.&rdquo;
        </Quote>
      </ScrollVideoPlayer>

      {/* ──────────────────────────────────────────────────────── */}
      {/* Section Two: The Stalking Gaze */}
      {/* ──────────────────────────────────────────────────────── */}
      <ScrollVideoPlayer
        videoSrc="/videos/catacomb_a_vintage_photograph--_the_person_or_people_come_to__863fb420-98b5-43b1-9540-9f7c375814c5_3.mp4"
      >
        <h2 className="text-lg font-semibold tracking-tight mb-6 text-foreground/60 uppercase">
          The Stalking Gaze
        </h2>
        <Quote attribution='Christen A. Smith, Impossible Privacy (2021)'>
          &ldquo;Black women have never known the luxury of privacy in the
          Americas. Impossible privacy is one of the tormenting dimensions of
          slavery and its afterlives. White supremacy meets us at every turn. Our
          every move is stalked and surveilled. Our bodies, our homes, our
          children, even our graves are not our own; able to be raided, poked,
          prodded or stolen at any moment.&rdquo;
        </Quote>
        <Quote attribution='Christen A. Smith, Impossible Privacy (2021)'>
          &ldquo;Police terror is a stalking master—the constant surveillance of
          white heterosexist, neoliberal, imperial and patriarchal supremacy.
          Like the shadow of Harriet Jacob&apos;s slave master at every turn, the
          state, via the police, allow Black women no private place of seclusion.
          The violation of privacy as a node of police violence is a uniquely
          intersectional terror that targets Black women specifically.&rdquo;
        </Quote>
      </ScrollVideoPlayer>

      {/* ──────────────────────────────────────────────────────── */}
      {/* Section Three: The Gesture of Grasping */}
      {/* ──────────────────────────────────────────────────────── */}
      <ScrollVideoPlayer
        videoSrc="/videos/catacomb_httpss.mj.run22emDJi0068_a_vintage_photograph--_the__6523b6cc-ba9b-4e5d-a190-212ed9eb71d5_3.mp4"
      >
        <h2 className="text-lg font-semibold tracking-tight mb-6 text-foreground/60 uppercase">
          The Gesture of Grasping
        </h2>
        <Quote attribution='Édouard Glissant, For Opacity (1989)'>
          &ldquo;The opaque is not the obscure, though it is possible for it to
          be so and be accepted as such. It is that which cannot be reduced,
          which is the most perennial guarantee of participation and confluence.
          In this version of understanding, the verb <em>to grasp</em> contains
          the movement of hands that grab their surroundings and bring them back
          to themselves. A gesture of enclosure if not appropriation. Let our
          understanding prefer the gesture of giving-on-and-with that opens
          finally on totality.&rdquo;
        </Quote>
        <Quote attribution='Édouard Glissant, For Opacity (1989)'>
          &ldquo;Agree not merely to the right to difference but, carrying this
          further, agree also to the right to opacity that is not enclosure
          within an impenetrable autarchy but subsistence within an irreducible
          singularity. Opacities can coexist and converge, weaving fabrics. To
          understand these truly one must focus on the texture of the weave and
          not on the nature of its components.&rdquo;
        </Quote>
      </ScrollVideoPlayer>

      {/* ──────────────────────────────────────────────────────── */}
      {/* Section Four: The Anthropologist's Dilemma */}
      {/* ──────────────────────────────────────────────────────── */}
      <ScrollVideoPlayer
        videoSrc="/videos/catacomb_httpss.mj.run29vxeShzJ5o_a_vintage_photograph--_the__6a75277a-5e2c-4a7a-9b7b-32d920694f99_0.mp4"
      >
        <h2 className="text-lg font-semibold tracking-tight mb-6 text-foreground/60 uppercase">
          The Anthropologist&apos;s Dilemma
        </h2>
        <Quote attribution='Zora Neale Hurston, Mules and Men (1935)'>
          &ldquo;The white man is always trying to know into somebody else&apos;s
          business. All right, I&apos;ll set something outside the door of my
          mind for him to play with and handle. He can read my writing but he
          sho&apos; can&apos;t read my mind. I&apos;ll put this play toy in his
          hand, and he will seize it and go away. Then I&apos;ll say my say and
          sing my song.&rdquo;
        </Quote>
        <Quote attribution='Christen A. Smith, Impossible Privacy (2021)'>
          &ldquo;How do we chronicle our stories without violating, yet again,
          Black women&apos;s privacy? In conducting my research, I constantly
          grapple with a fraught tension. Rigorous qualitative research, at least
          within the bounds of traditional anthropology, seems to require that we
          journey into the communities of the dead to peel back the layers of
          people&apos;s lives and sentiments in order to discover the truths of
          the past and present. Yet, there is something deeply unsettling to me
          about disturbing Black women&apos;s graves.&rdquo;
        </Quote>
      </ScrollVideoPlayer>

      {/* ──────────────────────────────────────────────────────── */}
      {/* Section Five: Identity on Its Own Terms */}
      {/* ──────────────────────────────────────────────────────── */}
      <ScrollVideoPlayer
        videoSrc="/videos/catacomb_httpss.mj.run6KgbrNU6Y2s_a_vintage_photograph--_the__5095fc97-376c-45d4-acca-733e793b94a0_2.mp4"
      >
        <h2 className="text-lg font-semibold tracking-tight mb-6 text-foreground/60 uppercase">
          Identity on Its Own Terms
        </h2>
        <Quote attribution='Édouard Glissant, For Opacity (1989)'>
          &ldquo;As far as my identity is concerned, I will take care of it
          myself. That is, I shall not allow it to become cornered in any
          essence; I shall also pay attention to not mixing it into any amalgam.
          Rather, it does not disturb me to accept that there are places where my
          identity is obscure to me, and the fact that it amazes me does not mean
          I relinquish it.&rdquo;
        </Quote>
        <Quote attribution='Édouard Glissant, For Opacity (1989)'>
          &ldquo;I thus am able to conceive of the opacity of the other for me,
          without reproach for my opacity for him. To feel in solidarity with him
          or to build with him or to like what he does, it is not necessary for
          me to grasp him. It is not necessary to try to become the other nor to
          &lsquo;make&rsquo; him in my image. These projects of transmutation
          have resulted from the worst pretensions and the greatest of
          magnanimities on the part of the West.&rdquo;
        </Quote>
      </ScrollVideoPlayer>

      {/* ──────────────────────────────────────────────────────── */}
      {/* Section Six: Towards Redaction */}
      {/* ──────────────────────────────────────────────────────── */}
      <ScrollVideoPlayer
        videoSrc="/videos/catacomb_httpss.mj.run7aFu2Y5oWrQ_a_vintage_photograph--_the__8faff143-d059-4906-8629-b62941cacb48_2.mp4"
        containerHeight="400vh"
      >
        <h2 className="text-lg font-semibold tracking-tight mb-6 text-foreground/60 uppercase">
          Towards Redaction
        </h2>
        <Quote attribution='Christen A. Smith, Impossible Privacy (2021)'>
          &ldquo;Redaction and annotation both obscure and sub-scribe Black life.
          Redaction, by definition, seeks to obscure, limiting, abbreviating and
          censoring. Police terror redacts Black life; abbreviating it, blocking
          it out, censoring it. This means, however, that writing about
          it—particularly ethnographically—requires a new mode of writing that
          can disrupt this terror in order to restore, to the extent possible,
          the sanctity of Black peace, unraveling impossible privacy.&rdquo;
        </Quote>
        <Quote attribution='Édouard Glissant, For Opacity (1989)'>
          &ldquo;Only by understanding that it is impossible to reduce anyone, no
          matter who, to a truth he would not have generated on his own. That is,
          within the opacity of his time and place. Plato&apos;s city is for
          Plato, Hegel&apos;s vision is for Hegel, the griot&apos;s town is for
          the griot. Nothing prohibits our seeing them in confluence, without
          confusing them in some magma or reducing them to each other.&rdquo;
        </Quote>
      </ScrollVideoPlayer>

      {/* ──────────────────────────────────────────────────────── */}
      {/* Closing Frame */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 max-w-2xl mx-auto text-center">
        <div className="space-y-8">
          <Quote attribution='Christen A. Smith, Impossible Privacy (2021)'>
            &ldquo;To be a Black woman and anthropologist is to sit at the
            crossroads of telling and not telling, recognizing that my impossible
            privacy is also implicated in my mandate to tell. Ethnographic
            redaction—refusing to tell the finished story and reveal the totality
            of what is not known—is, then, one way to engage in a politics of
            refusal. Tell me the story that you want to tell and I will write it
            as you have told it. It is for you, not for me.&rdquo;
          </Quote>
          <blockquote className="border-l-2 border-border/60 pl-4">
            <p className="text-base leading-relaxed text-foreground italic">
              &ldquo;We clamor for the right to opacity for everyone.&rdquo;
            </p>
            <cite className="block mt-2 text-xs text-muted-foreground not-italic">
              Édouard Glissant, <em>For Opacity</em> (1989)
            </cite>
          </blockquote>
        </div>
        <Link
          href="/"
          className="mt-20 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}
