<template>
  <div class="org-view">
    <div class="org-tree">
      <div class="inner-title">
        <el-button type="success" :icon="Plus" class="w-full">
          新增部門
        </el-button>
        <el-button
          type="primary"
          :icon="Setting"
          class="w-full"
          style="margin-left: 0"
        >
          組織管理
        </el-button>
      </div>
      <el-input
        v-model="filterText"
        class="w-60 mb-2"
        placeholder="搜尋部門..."
      />
      <el-tree
        ref="treeRef"
        :data="data"
        :props="defaultProps"
        node-key="id"
        :current-node-key="selectedOrgId"
        default-expand-all
        :expand-on-click-node="false"
        :style="{ height: `${tableHeight + 12}px` }"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <span>{{ node.label }} ({{ data.userCount }})</span>
          </div>
        </template>
      </el-tree>
    </div>
    <div class="org-client">
      <div class="inner-title">
        <div>
          <el-button type="primary" :icon="UserFilled">調動部門</el-button>
        </div>
        <el-input
          v-model="searchClient"
          style="width: 240px"
          placeholder="搜尋用戶..."
          class="ml-auto"
        />
      </div>
      <TablePage
        v-model:current-page="currentPage"
        :total="pageTotal"
        @page-change="fetchData"
      >
        <el-table :data="tableData" border :height="tableHeight">
          <el-table-column
            v-for="column in columns"
            :key="column.prop || column.type"
            :type="column.type"
            :index="column.index"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :align="column.align"
            :fixed="column.fixed"
          >
            <template #default="{ row }">
              <div v-if="column.prop === 'user'">
                <UserCell :user="row.user" />
              </div>
              <span v-else-if="column.prop === 'status'">
                <UserStatus :status="row.status" />
              </span>
              <div v-else-if="column.prop === 'action'">
                <UserAction :row="row" />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </TablePage>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { FAKE_DATA } from "@/mock/fake-data";
import { useSettingStore } from "@/store/setting";
import { Plus, UserFilled, Setting } from "@element-plus/icons-vue";

// components
import UserCell from "@/components/table/UserCell.vue";
import TablePage from "@/components/table/TablePage.vue";
import UserStatus from "@/components/table/UserStatus.vue";
import UserAction from "@/components/table/UserAction.vue";

// 取得視窗高度並計算表格高度
const settingStore = useSettingStore();
const tableHeight = computed(() => settingStore.domHeight - 232);

const columns = computed(() => [
  {
    type: "index",
    index: (index: number) =>
      (currentPage.value - 1) * pageSize.value + index + 1,
    label: "項次",
    width: 60,
    fixed: "left",
    align: "center",
  },
  {
    prop: "id",
    label: "編號",
    width: 100,
    fixed: "left",
    align: "center",
  },
  {
    prop: "user",
    label: "使用者",
    width: 180,
  },
  {
    prop: "jobTitle",
    label: "職稱",
    width: 140,
  },
  {
    prop: "role",
    label: "權限",
    width: 140,
  },
  {
    prop: "createdAt",
    label: "建立時間",
    width: 140,
  },
  {
    prop: "status",
    label: "狀態",
    width: 60,
    align: "center",
    fixed: "right",
  },
  {
    prop: "action",
    label: "操作",
    width: 140,
    align: "center",
    fixed: "right",
  },
]);

// 組織樹資料
interface Tree {
  [key: string]: any;
}
interface OrgTree {
  label: string;
  children?: OrgTree[];
}

const defaultProps = {
  children: "children",
  label: "label",
};

import type { OrgNode } from "@/types/organization";

const transformOrgTree = (nodes: OrgNode[]): Tree[] => {
  return nodes.map((node) => {
    const { name, children, ...rest } = node;
    return {
      ...rest,
      label: name, // 將 name 改為 label
      ...(children && children.length > 0
        ? { children: transformOrgTree(children) }
        : {}),
    };
  });
};

const data = computed<Tree[]>(() => transformOrgTree(FAKE_DATA.mockOrgTree));

// 組織樹搜尋監聽
import type { FilterNodeMethodFunction, TreeInstance } from "element-plus";
const filterText = ref("");
const treeRef = ref<TreeInstance>();

watch(filterText, (val) => {
  treeRef.value!.filter(val);
});
const filterNode: FilterNodeMethodFunction = (value: string, data: Tree) => {
  if (!value) return true;
  return data.label.includes(value);
};

// 組織樹點擊篩選用戶

const selectedOrgId = ref<string>("org-root");
const searchClient = ref<string>("");

const getAllSubOrgIds = (node: Tree): string[] => {
  let ids = [node.id];
  if (node.children && node.children.length > 0) {
    node.children.forEach((child: Tree) => {
      ids = ids.concat(getAllSubOrgIds(child));
    });
  }
  return ids;
};

const selectedOrgIds = ref<string[]>([]);

const filteredData = computed(() => {
  return FAKE_DATA.mockOrgUsers.filter((item) => {
    // 組織篩選：比對 item.orgId 是否在選中的 ID 陣列內
    const matchesOrg =
      selectedOrgIds.value.length === 0 ||
      selectedOrgIds.value.includes(item.orgId);

    // 關鍵字搜尋
    const query = searchClient.value.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.user.name.toLowerCase().includes(query) ||
      item.user.email.toLowerCase().includes(query);

    return matchesOrg && matchesSearch;
  });
});

const handleNodeClick = (nodeData: Tree) => {
  selectedOrgId.value = nodeData.id;
  selectedOrgIds.value = getAllSubOrgIds(nodeData);
  currentPage.value = 1;
};

// 當搜尋關鍵字改變時，自動回到第 1 頁
watch(searchClient, () => {
  currentPage.value = 1;
});

// 表格資料 & 頁碼處理
const pageTotal = computed(() => filteredData.value.length);
const currentPage = ref(1);
const pageSize = ref(10);
const tableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredData.value.slice(start, start + pageSize.value);
});

// 切換頁碼時呼叫
const fetchData = (page: number, size: number) => {
  console.log("重新載入資料:", { page, size });
  // 呼叫 API 重新載入列表...
};
</script>

<style scoped lang="scss">
.org-view {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  .org-tree {
    width: 300px;
    height: 100%;
    padding-right: $inner-padding * 2;
    margin-right: $inner-padding * 2;
    border-right: 1px solid #ddd;
  }
  .org-client {
    width: calc(100% - 300px);
  }
}
</style>
