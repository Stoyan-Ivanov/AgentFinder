import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/new",
      name: "new inquiry",
      component: () => import("@/views/create-inquiry/CreateInquiryView.vue"),
      redirect: "/new/type",
      children: [
        {
          path: "type",
          name: "service type step",
          component: () =>
            import("@/views/create-inquiry/steps/StepInquiryType.vue"),
        },
        {
          path: "home-budget",
          name: "home budget",
          component: () =>
            import("@/views/create-inquiry/steps/StepPropertyBudget.vue"),
        },
        {
          path: "home-value",
          name: "home value",
          component: () =>
            import("@/views/create-inquiry/steps/StepPropertyValue.vue"),
        },
        {
          path: "contact",
          name: "contact",
          component: () =>
            import("@/views/create-inquiry/steps/StepPersonalInformation.vue"),
        },
        {
          path: "financing",
          name: "financing",
          component: () =>
            import("@/views/create-inquiry/steps/StepFinancingInformation.vue"),
        },
        {
          path: "success",
          name: "success",
          component: () =>
            import("@/views/create-inquiry/steps/StepSuccess.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/admin/Admin.vue"),
    },
  ],
});

export default router;
