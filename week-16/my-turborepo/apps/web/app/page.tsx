import Image from "next/image";
import { Button } from "@repo/ui/button";
import {Admin} from "@repo/ui/admin"
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <Admin />
      <Button appName="web app">
        Click me
      </Button>
    </div>
  );
}
