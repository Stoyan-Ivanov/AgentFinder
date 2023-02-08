import { InquiryType } from "@/models/inquiry";
import router from "@/router";
import { useNewInquiryStore } from "@/stores/newInquiry";
import { computed } from "vue";

export const useCreateInquiryStepManager = () => {
  /**
   * 🗻 The possible stepper/router flows depending on inquiry type
   */
  const routeFlows: Map<string, string[]> = new Map([
    [
      InquiryType.RENT,
      ["/new/type", "/new/home-budget", "/new/contact", "/new/success"],
    ],
    [
      InquiryType.BUY,
      [
        "/new/type",
        "/new/home-budget",
        "/new/contact",
        "/new/financing",
        "/new/success",
      ],
    ],
    [
      InquiryType.SELL,
      ["/new/type", "/new/home-value", "/new/contact", "/new/success"],
    ],
  ]);

  /**
   * 📦 The path which is currently active
   */
  const currentPath = computed<string>(() => router.currentRoute.value.path);

  /**
   * 📦 The inquiry type the user has chosen
   */
  const inquiryType = computed<InquiryType | null>(() => {
    let store = useNewInquiryStore();
    return store.inquiryBuilder.type;
  });

  /**
   * 🚪 Determines the next step of the user's inquiry creation flow based on the inquiry type and navigates there
   */
  function nextStep() {
    if (!inquiryType.value) {
      router.replace("/");
      return;
    }

    const routesForFlow = routeFlows.get(inquiryType.value);
    const currentRouteIndex = routesForFlow?.indexOf(currentPath.value);

    if (
      routesForFlow != undefined &&
      currentRouteIndex != undefined &&
      currentRouteIndex < routesForFlow.length - 1
    ) {
      router.push(routesForFlow[currentRouteIndex + 1]);
    }
  }

  /**
   * 🚪 Determines the previous step of the user's inquiry creation flow based on the inquiry type and navigates there
   */
  function previousStep() {
    if (!inquiryType.value) {
      router.replace("/");
      return;
    }

    const routesForFlow = routeFlows.get(inquiryType.value);
    const currentRouteIndex = routesForFlow?.indexOf(currentPath.value);

    if (
      routesForFlow != undefined &&
      currentRouteIndex != undefined &&
      currentRouteIndex > 0
    ) {
      router.replace(routesForFlow[currentRouteIndex - 1]);
      return;
    }

    router.replace("/");
  }

  /**
   * 🏗 Keeps track of the create inquiry step progress depending on the currently visited route
   */
  const stepperProgress = computed(() => {
    if (!inquiryType.value || !routeFlows.get(inquiryType.value)) {
      return { completed: 1, pending: 0 };
    }

    const totalFlowSteps: number = routeFlows.get(inquiryType.value)!.length;
    const currentRouteIndex: number = routeFlows
      .get(inquiryType.value)!
      .indexOf(currentPath.value);

    return {
      completed: currentRouteIndex + 1,
      pending: totalFlowSteps - (currentRouteIndex + 1),
    };
  });

  return { nextStep, previousStep, stepperProgress };
};
