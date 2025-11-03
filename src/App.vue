<template>
  <div class="app-container">
    <!-- 登录/注册页面 -->
    <div v-if="!isAuthenticated" class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <Users :size="48" class="auth-logo" />
          <h1 class="auth-title">通讯录管理系统</h1>
          <p class="auth-subtitle">Contact Management System</p>
        </div>

        <!-- 登录表单 -->
        <div v-if="authView === 'login'" class="auth-form">
          <h2 class="form-title">登录</h2>
          <form @submit.prevent="handleLogin">
            <div class="auth-form-group">
              <label for="login-username">
                <User :size="18" />
                用户名
              </label>
              <input
                id="login-username"
                v-model="loginForm.username"
                type="text"
                placeholder="请输入用户名"
                required
                autocomplete="username"
              />
            </div>
            <div class="auth-form-group">
              <label for="login-password">
                <Lock :size="18" />
                密码
              </label>
              <input
                id="login-password"
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                required
                autocomplete="current-password"
              />
            </div>
            <button type="submit" class="auth-btn auth-btn-primary">
              <LogIn :size="20" />
              登录
            </button>
          </form>
          <div class="auth-switch">
            还没有账号？
            <button @click="authView = 'register'" class="link-btn">立即注册</button>
          </div>
        </div>

        <!-- 注册表单 -->
        <div v-if="authView === 'register'" class="auth-form">
          <h2 class="form-title">注册</h2>
          <form @submit.prevent="handleRegister">
            <div class="auth-form-group">
              <label for="register-username">
                <User :size="18" />
                用户名
              </label>
              <input
                id="register-username"
                v-model="registerForm.username"
                type="text"
                placeholder="至少3个字符"
                required
                autocomplete="username"
              />
            </div>
            <div class="auth-form-group">
              <label for="register-password">
                <Lock :size="18" />
                密码
              </label>
              <input
                id="register-password"
                v-model="registerForm.password"
                type="password"
                placeholder="至少6个字符"
                required
                autocomplete="new-password"
              />
            </div>
            <div class="auth-form-group">
              <label for="register-confirm-password">
                <Lock :size="18" />
                确认密码
              </label>
              <input
                id="register-confirm-password"
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="请再次输入密码"
                required
                autocomplete="new-password"
              />
            </div>
            <button type="submit" class="auth-btn auth-btn-primary">
              <UserPlus :size="20" />
              注册
            </button>
          </form>
          <div class="auth-switch">
            已有账号？
            <button @click="authView = 'login'" class="link-btn">立即登录</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 主应用（登录后显示） -->
    <div v-else class="main-app">
      <header class="app-header">
        <div class="header-left">
          <h1 class="app-title">
            <Users :size="28" />
            通讯录管理系统
          </h1>
          <p class="app-subtitle">Contact Management System</p>
        </div>
        <div class="header-right">
          <span class="user-info">
            <User :size="18" />
            {{ currentUser }}
          </span>
          <button @click="handleLogout" class="btn-logout">
            <LogOut :size="18" />
            登出
          </button>
        </div>
      </header>

    <div class="app-body">
      <aside class="sidebar">
        <div class="sidebar-section">
          <div 
            class="sidebar-item" 
            :class="{ active: selectedGroup === null }"
            @click="selectGroup(null)"
          >
            <UsersRound :size="18" />
            <span>全部联系人</span>
            <span class="badge">{{ contacts.length }}</span>
          </div>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-group-header" @click="toggleGroups">
            <span class="group-header-text">
              <Tag :size="18" />
              <span>我的分组</span>
            </span>
            <ChevronRight :size="18" class="arrow" :class="{ expanded: groupsExpanded }" />
          </div>
          <div v-if="groupsExpanded" class="sidebar-group-list">
            <div 
              v-for="group in groups" 
              :key="group.id" 
              class="sidebar-group-item"
              :class="{ active: selectedGroup === group.name }"
              @click="selectGroup(group.name)"
            >
              <span class="group-name">{{ group.name }}</span>
              <div class="group-actions">
                <span class="badge">{{ group.count }}</span>
                <button 
                  v-if="group.name !== '未分组'"
                  @click.stop="deleteGroup(group)"
                  class="btn-icon-small"
                  title="删除分组"
                >
                  <X :size="14" />
                </button>
              </div>
            </div>
            <div class="sidebar-group-item add-group-btn" @click="showAddGroupModal = true">
              <Plus :size="16" />
              <span>添加分组</span>
            </div>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <!-- 添加联系人表单 -->
        <div class="add-contact-section">
          <h2 class="section-title">
            <UserPlus :size="20" />
            添加新联系人
          </h2>
          <form @submit.prevent="addContact" class="contact-form">
            <div class="form-group">
              <label for="name">
                <User :size="16" />
                姓名
              </label>
              <input
                id="name"
                v-model="newContact.name"
                type="text"
                placeholder="请输入姓名"
                required
              />
            </div>
            <div class="form-group">
              <label for="phone">
                <Phone :size="16" />
                电话
              </label>
              <input
                id="phone"
                v-model="newContact.phone"
                type="tel"
                placeholder="请输入电话号码"
                required
              />
            </div>
            <div class="form-group">
              <label for="position">
                <Briefcase :size="16" />
                职务
              </label>
              <input
                id="position"
                v-model="newContact.position"
                type="text"
                placeholder="请输入职务"
              />
            </div>
            <div class="form-group">
              <label for="group">
                <Tag :size="16" />
                分组
              </label>
              <select
                id="group"
                v-model="newContact.group_name"
                class="form-select"
              >
                <option v-for="group in groups" :key="group.id" :value="group.name">
                  {{ group.name }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">
              <UserPlus :size="18" />
              添加联系人
            </button>
          </form>
        </div>

        <!-- 联系人列表 -->
        <div class="contacts-section">
          <div class="section-header">
            <h2 class="section-title">
              <Users :size="20" />
              联系人列表
            </h2>
            <div class="contact-count">
              共 <span class="count-number">{{ contacts.length }}</span> 位联系人
            </div>
          </div>

          <!-- 搜索栏 -->
          <div class="search-section">
            <div class="search-bar">
              <Search :size="18" class="search-icon" />
              <input
                v-model="searchKeyword"
                type="text"
                class="search-input"
                placeholder="搜索联系人（姓名、电话或职务）"
                @input="handleSearch"
              />
              <button
                v-if="searchKeyword"
                @click="clearSearch"
                class="clear-btn"
                title="清空搜索"
              >
                <X :size="16" />
              </button>
            </div>
            <div v-if="isSearching" class="search-info">
              找到 <span class="highlight">{{ contacts.length }}</span> 个结果
            </div>
          </div>

          <!-- 加载状态 -->
          <div v-if="loading" class="loading">
            <Loader2 :size="40" class="spinner-icon" />
            <p>加载中...</p>
          </div>

          <!-- 错误提示 -->
          <div v-if="error" class="error-message">
            <AlertCircle :size="20" />
            {{ error }}
          </div>

          <!-- 空状态 -->
          <div v-if="!loading && contacts.length === 0" class="empty-state">
            <UsersRound :size="64" class="empty-icon" />
            <p class="empty-text">还没有任何联系人</p>
            <p class="empty-hint">请使用上方表单添加第一位联系人</p>
          </div>

          <!-- 联系人表格 -->
          <table v-if="!loading && contacts.length > 0" class="contacts-table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>电话</th>
                <th>职务</th>
                <th>分组</th>
                <th class="actions-col">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="contact in contacts"
                :key="contact.id"
                class="contact-row"
              >
                <!-- 查看模式 -->
                <template v-if="editingId !== contact.id">
                  <td class="contact-name">{{ contact.name }}</td>
                  <td class="contact-phone">{{ contact.phone }}</td>
                  <td class="contact-position">{{ contact.position || '-' }}</td>
                  <td class="contact-group">
                    <span class="group-tag">{{ contact.group_name || '未分组' }}</span>
                  </td>
                  <td class="contact-actions">
                    <button
                      @click="startEdit(contact)"
                      class="btn btn-small btn-edit"
                    >
                      <Edit2 :size="14" />
                      编辑
                    </button>
                    <button
                      @click="deleteContact(contact.id)"
                      class="btn btn-small btn-delete"
                    >
                      <Trash2 :size="14" />
                      删除
                    </button>
                  </td>
                </template>

                <!-- 编辑模式 -->
                <template v-else>
                  <td>
                    <input
                      v-model="editForm.name"
                      type="text"
                      class="edit-input"
                      required
                    />
                  </td>
                  <td>
                    <input
                      v-model="editForm.phone"
                      type="tel"
                      class="edit-input"
                      required
                    />
                  </td>
                  <td>
                    <input
                      v-model="editForm.position"
                      type="text"
                      class="edit-input"
                    />
                  </td>
                  <td>
                    <select
                      v-model="editForm.group_name"
                      class="edit-select"
                    >
                      <option v-for="group in groups" :key="group.id" :value="group.name">
                        {{ group.name }}
                      </option>
                    </select>
                  </td>
                  <td class="contact-actions">
                    <button
                      @click="updateContact(contact.id)"
                      class="btn btn-small btn-save"
                    >
                      <Save :size="14" />
                      保存
                    </button>
                    <button
                      @click="cancelEdit"
                      class="btn btn-small btn-cancel"
                    >
                      <X :size="14" />
                      取消
                    </button>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
    </div>

    <!-- 消息提示 -->
    <transition name="toast">
      <div v-if="toast.show" :class="['toast', `toast-${toast.type}`]">
        <CheckCircle v-if="toast.type === 'success'" :size="20" />
        <AlertCircle v-if="toast.type === 'error'" :size="20" />
        {{ toast.message }}
      </div>
    </transition>

    <!-- 添加分组弹窗 -->
    <transition name="modal">
      <div v-if="showAddGroupModal" class="modal-overlay" @click="showAddGroupModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">
              <FolderPlus :size="20" />
              添加新分组
            </h3>
            <button @click="showAddGroupModal = false" class="modal-close">
              <X :size="20" />
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="groupName">分组名称</label>
              <input
                id="groupName"
                v-model="newGroupName"
                type="text"
                placeholder="请输入分组名称"
                @keyup.enter="addGroup"
                autofocus
              />
            </div>
          </div>
          <div class="modal-footer">
            <button @click="showAddGroupModal = false" class="btn btn-cancel">
              <X :size="16" />
              取消
            </button>
            <button @click="addGroup" class="btn btn-primary">
              <Plus :size="16" />
              添加
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from './api/contacts'
import { 
  Users, 
  UserPlus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  ChevronRight,
  UsersRound,
  Briefcase,
  Phone,
  User,
  CheckCircle,
  AlertCircle,
  Loader2,
  FolderPlus,
  Plus,
  Tag,
  Lock,
  LogIn,
  LogOut,
  Search
} from 'lucide-vue-next'

export default {
  name: 'App',
  components: {
    Users,
    UserPlus,
    Edit2,
    Trash2,
    Save,
    X,
    ChevronRight,
    UsersRound,
    Briefcase,
    Phone,
    User,
    CheckCircle,
    AlertCircle,
    Loader2,
    FolderPlus,
    Plus,
    Tag,
    Lock,
    LogIn,
    LogOut,
    Search
  },
  setup() {
    const isAuthenticated = ref(false)
    const currentUser = ref('')
    const authView = ref('login')
    const loginForm = ref({ username: '', password: '' })
    const registerForm = ref({ username: '', password: '', confirmPassword: '' })

    const contacts = ref([])
    const loading = ref(false)
    const error = ref(null)
    const newContact = ref({ name: '', phone: '', position: '', group_name: '未分组' })
    const editingId = ref(null)
    const editForm = ref({ name: '', phone: '', position: '', group_name: '' })
    const toast = ref({ show: false, type: 'success', message: '' })
    const groupsExpanded = ref(true)
    const groups = ref([])
    const selectedGroup = ref(null)
    const showAddGroupModal = ref(false)
    const newGroupName = ref('')
    const searchKeyword = ref('')
    const isSearching = ref(false)
    let searchTimer = null

    const showToast = (message, type = 'success') => {
      toast.value = { show: true, message, type }
      setTimeout(() => { toast.value.show = false }, 3000)
    }

    const checkAuthentication = async () => {
      try {
        const data = await api.checkAuth()
        if (data.authenticated) {
          isAuthenticated.value = true
          currentUser.value = data.username
          // 认证成功后加载数据
          fetchGroups()
          fetchContacts()
        }
      } catch (err) {
        console.log('未登录')
      }
    }

    const handleLogin = async () => {
      if (!loginForm.value.username || !loginForm.value.password) {
        showToast('请填写完整信息', 'error')
        return
      }

      try {
        const data = await api.login(loginForm.value)
        isAuthenticated.value = true
        currentUser.value = data.username
        showToast('登录成功！欢迎回来！')
        loginForm.value = { username: '', password: '' }
        fetchGroups()
        fetchContacts()
      } catch (err) {
        showToast(err.message, 'error')
      }
    }

    const handleRegister = async () => {
      if (!registerForm.value.username || !registerForm.value.password || !registerForm.value.confirmPassword) {
        showToast('请填写完整信息', 'error')
        return
      }

      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        showToast('两次输入的密码不一致', 'error')
        return
      }

      try {
        const username = registerForm.value.username
        await api.register({
          username: registerForm.value.username,
          password: registerForm.value.password
        })
        showToast('注册成功！请登录')
        registerForm.value = { username: '', password: '', confirmPassword: '' }
        authView.value = 'login'
        loginForm.value.username = username
      } catch (err) {
        showToast(err.message, 'error')
      }
    }

    const handleLogout = async () => {
      if (!confirm('确定要登出吗？')) return

      try {
        await api.logout()
        isAuthenticated.value = false
        currentUser.value = ''
        contacts.value = []
        groups.value = []
        showToast('已登出')
      } catch (err) {
        showToast('登出失败', 'error')
      }
    }

    const fetchGroups = async () => {
      try {
        const data = await api.getAllGroups()
        groups.value = data.groups
      } catch (err) {
        showToast('获取分组列表失败', 'error')
      }
    }

    const fetchContacts = async () => {
      loading.value = true
      error.value = null
      try {
        const data = await api.getAllContacts(selectedGroup.value)
        contacts.value = data.contacts
      } catch (err) {
        error.value = '获取联系人列表失败: ' + err.message
        showToast('获取联系人列表失败', 'error')
      } finally {
        loading.value = false
      }
    }

    const selectGroup = (groupName) => {
      selectedGroup.value = groupName
      clearSearch()
      fetchContacts()
    }

    const handleSearch = () => {
      if (searchTimer) clearTimeout(searchTimer)
      
      searchTimer = setTimeout(async () => {
        const keyword = searchKeyword.value.trim()
        
        if (!keyword) {
          isSearching.value = false
          fetchContacts()
          return
        }
        
        loading.value = true
        error.value = null
        isSearching.value = true
        
        try {
          const data = await api.searchContacts(keyword, selectedGroup.value)
          contacts.value = data.contacts
          showToast(`找到 ${data.count} 个结果`)
        } catch (err) {
          error.value = '搜索失败: ' + err.message
          showToast('搜索失败', 'error')
        } finally {
          loading.value = false
        }
      }, 500)
    }

    const clearSearch = () => {
      searchKeyword.value = ''
      isSearching.value = false
      if (searchTimer) clearTimeout(searchTimer)
      fetchContacts()
    }

    const addGroup = async () => {
      if (!newGroupName.value.trim()) {
        showToast('请输入分组名称', 'error')
        return
      }

      try {
        await api.addGroup({ name: newGroupName.value })
        showToast('分组添加成功！')
        newGroupName.value = ''
        showAddGroupModal.value = false
        fetchGroups()
      } catch (err) {
        showToast('添加失败: ' + err.message, 'error')
      }
    }

    const deleteGroup = async (group) => {
      if (group.name === '未分组') {
        showToast('不能删除"未分组"', 'error')
        return
      }

      if (!confirm(`确定要删除分组"${group.name}"吗？该分组的联系人将被移到"未分组"。`)) return

      try {
        await api.deleteGroup(group.id)
        showToast('分组删除成功！')
        if (selectedGroup.value === group.name) {
          selectedGroup.value = null
        }
        fetchGroups()
        fetchContacts()
      } catch (err) {
        showToast('删除失败: ' + err.message, 'error')
      }
    }

    const addContact = async () => {
      if (!newContact.value.name.trim() || !newContact.value.phone.trim()) {
        showToast('请填写完整信息', 'error')
        return
      }

      try {
        await api.addContact(newContact.value)
        showToast('联系人添加成功！')
        newContact.value = { name: '', phone: '', position: '', group_name: '未分组' }
        fetchGroups()
        fetchContacts()
      } catch (err) {
        showToast('添加失败: ' + err.message, 'error')
      }
    }

    const startEdit = (contact) => {
      editingId.value = contact.id
      editForm.value = {
        name: contact.name,
        phone: contact.phone,
        position: contact.position || '',
        group_name: contact.group_name || '未分组'
      }
    }

    const cancelEdit = () => {
      editingId.value = null
      editForm.value = { name: '', phone: '', position: '', group_name: '' }
    }

    const toggleGroups = () => {
      groupsExpanded.value = !groupsExpanded.value
    }

    const updateContact = async (id) => {
      if (!editForm.value.name.trim() || !editForm.value.phone.trim()) {
        showToast('请填写完整信息', 'error')
        return
      }

      try {
        await api.updateContact(id, editForm.value)
        showToast('联系人更新成功！')
        cancelEdit()
        fetchGroups()
        fetchContacts()
      } catch (err) {
        showToast('更新失败: ' + err.message, 'error')
      }
    }

    const deleteContact = async (id) => {
      if (!confirm('确定要删除这个联系人吗？')) return

      try {
        await api.deleteContact(id)
        showToast('联系人删除成功！')
        fetchGroups()
        fetchContacts()
      } catch (err) {
        showToast('删除失败: ' + err.message, 'error')
      }
    }

    onMounted(() => {
      checkAuthentication()
    })

    return {
      isAuthenticated, currentUser, authView, loginForm, registerForm,
      handleLogin, handleRegister, handleLogout,
      contacts, loading, error, newContact, editingId, editForm,
      toast, groupsExpanded, groups, selectedGroup, showAddGroupModal,
      newGroupName, searchKeyword, isSearching,
      addContact, startEdit, cancelEdit, updateContact, deleteContact,
      toggleGroups, selectGroup, addGroup, deleteGroup, handleSearch, clearSearch
    }
  }
}
</script>

<style scoped>
.app-container {
  animation: fadeIn 0.3s ease;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 登录/注册页面样式 */
.auth-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%);
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.auth-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 420px;
  overflow: hidden;
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-header {
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  color: white;
  padding: 40px 30px;
  text-align: center;
}

.auth-logo {
  margin: 0 auto 20px;
  opacity: 0.95;
}

.auth-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.auth-subtitle {
  font-size: 0.95rem;
  opacity: 0.9;
  font-weight: 300;
  letter-spacing: 1px;
}

.auth-form {
  padding: 40px 30px;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #303133;
  margin-bottom: 30px;
  text-align: center;
}

.auth-form-group {
  margin-bottom: 24px;
}

.auth-form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #606266;
  margin-bottom: 10px;
}

.auth-form-group input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  font-family: inherit;
  box-sizing: border-box;
}

.auth-form-group input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
}

.auth-form-group input::placeholder {
  color: #c0c4cc;
}

.auth-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  margin-top: 30px;
}

.auth-btn-primary {
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.4);
}

.auth-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.5);
}

.auth-btn-primary:active {
  transform: translateY(0);
}

.auth-switch {
  text-align: center;
  margin-top: 24px;
  color: #606266;
  font-size: 0.95rem;
}

.link-btn {
  background: none;
  border: none;
  color: #409eff;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  font-family: inherit;
  padding: 0;
  text-decoration: none;
  transition: color 0.2s;
}

.link-btn:hover {
  color: #66b1ff;
  text-decoration: underline;
}

.main-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 头部样式 */
.app-header {
  background: #ffffff;
  padding: 20px 40px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 16px;
  background: #f5f7fa;
  border-radius: 20px;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #f56c6c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-logout:hover {
  background: #f78989;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(245, 108, 108, 0.3);
}

.btn-logout:active {
  transform: translateY(0);
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-subtitle {
  font-size: 0.85rem;
  color: #909399;
  font-weight: 400;
  letter-spacing: 0.5px;
}

/* 主体布局 */
.app-body {
  display: flex;
  flex: 1;
}

/* 侧边栏 */
.sidebar {
  width: 220px;
  background: #ffffff;
  border-right: 1px solid #e4e7ed;
  padding: 20px 0;
}

.sidebar-section {
  margin-bottom: 10px;
}

.sidebar-item {
  padding: 12px 24px;
  color: #606266;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-item:hover {
  background: #f5f7fa;
  color: #409eff;
}

.sidebar-item.active {
  background: #ecf5ff;
  color: #409eff;
  font-weight: 500;
  border-right: 3px solid #409eff;
}

.sidebar-group-header {
  padding: 12px 24px;
  color: #606266;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.group-header-text {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-group-header:hover {
  background: #f5f7fa;
}

.arrow {
  transition: transform 0.3s;
  color: #909399;
}

.arrow.expanded {
  transform: rotate(90deg);
}

.sidebar-group-list {
  background: #fafafa;
}

.sidebar-group-item {
  padding: 10px 24px 10px 40px;
  color: #606266;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-group-item:hover {
  background: #f0f2f5;
  color: #409eff;
}

.sidebar-group-item.active {
  background: #ecf5ff;
  color: #409eff;
  font-weight: 500;
}

.sidebar-group-item .group-name {
  flex: 1;
}

.sidebar-group-item .group-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.add-group-btn {
  color: #409eff;
  font-weight: 500;
  gap: 6px;
}

.add-group-btn:hover {
  background: #ecf5ff;
}

.badge {
  background: #e4e7ed;
  color: #606266;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: auto;
}

.sidebar-item .badge {
  margin-left: auto;
}

.btn-icon-small {
  background: none;
  border: none;
  color: #909399;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  transition: all 0.2s;
}

.btn-icon-small:hover {
  background: #f56c6c;
  color: white;
}

/* 主内容区 */
.main-content {
  flex: 1;
  padding: 30px 40px;
  overflow-y: auto;
}

/* 区块样式 */
.add-contact-section,
.contacts-section {
  background: white;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
  border: 1px solid #e4e7ed;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 8px;
}

.add-contact-section .section-title {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}


.contact-count {
  font-size: 0.9rem;
  color: #909399;
}

.count-number {
  font-size: 1.1rem;
  font-weight: 600;
  color: #409eff;
}

/* 表单样式 */
.contact-form {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
}

@media (max-width: 1024px) {
  .contact-form {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .contact-form {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.form-group input {
  padding: 10px 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 0.95rem;
  transition: all 0.2s;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: none;
}

.form-select {
  padding: 10px 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 0.95rem;
  transition: all 0.2s;
  font-family: inherit;
  background-color: white;
  cursor: pointer;
}

.form-select:focus {
  outline: none;
  border-color: #409eff;
}

/* 按钮样式 */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-family: inherit;
  white-space: nowrap;
}

.btn-primary {
  background: #409eff;
  color: white;
  align-self: end;
}

.btn-primary:hover {
  background: #66b1ff;
}

.btn-primary:active {
  background: #3a8ee6;
}

.btn-small {
  padding: 6px 10px;
  font-size: 0.85rem;
  white-space: nowrap;
}

.btn-edit {
  background: #67c23a;
  color: white;
}

.btn-edit:hover {
  background: #85ce61;
}

.btn-delete {
  background: #f56c6c;
  color: white;
}

.btn-delete:hover {
  background: #f78989;
}

.btn-save {
  background: #409eff;
  color: white;
}

.btn-save:hover {
  background: #66b1ff;
}

.btn-cancel {
  background: #909399;
  color: white;
}

.btn-cancel:hover {
  background: #a6a9ad;
}

/* 加载状态 */
.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.spinner-icon {
  color: #409eff;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误提示 */
.error-message {
  background: #fef0f0;
  color: #f56c6c;
  padding: 12px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #fde2e2;
}

/* 搜索栏样式 */
.search-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 600px;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: #909399;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px 45px 12px 45px;
  border: 2px solid #dcdfe6;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s;
  font-family: inherit;
  background-color: #f5f7fa;
}

.search-input:focus {
  outline: none;
  border-color: #409eff;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
}

.search-input::placeholder {
  color: #c0c4cc;
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: #f5f7fa;
  border: none;
  color: #909399;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #e4e7ed;
  color: #606266;
}

.search-info {
  margin-top: 12px;
  font-size: 0.9rem;
  color: #606266;
  padding: 8px 12px;
  background: #ecf5ff;
  border-radius: 4px;
  display: inline-block;
}

.search-info .highlight {
  color: #409eff;
  font-weight: 600;
  font-size: 1rem;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 50px 20px;
  color: #909399;
}

.empty-icon {
  color: #dcdfe6;
  margin-bottom: 20px;
}

.empty-text {
  font-size: 1rem;
  font-weight: 500;
  color: #606266;
  margin-bottom: 8px;
}

.empty-hint {
  font-size: 0.9rem;
  color: #909399;
}

/* 联系人表格 */
.contacts-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.contacts-table thead {
  background: #fafafa;
}

.contacts-table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #606266;
  border-bottom: 2px solid #e4e7ed;
}

.contacts-table th.actions-col {
  text-align: center;
  width: 200px;
  min-width: 200px;
}

.contacts-table tbody tr {
  border-bottom: 1px solid #e4e7ed;
  transition: background 0.2s;
}

.contacts-table tbody tr:hover {
  background: #f5f7fa;
}

.contacts-table td {
  padding: 14px 16px;
  color: #303133;
}

.contact-name {
  font-weight: 500;
  color: #303133;
}

.contact-phone {
  color: #606266;
}

.contact-position {
  color: #909399;
}

.contact-group {
  color: #606266;
}

.group-tag {
  display: inline-block;
  background: #ecf5ff;
  color: #409eff;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.contact-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.edit-input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.2s;
  font-family: inherit;
}

.edit-input:focus {
  outline: none;
  border-color: #409eff;
}

.edit-select {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.2s;
  font-family: inherit;
  background-color: white;
  cursor: pointer;
}

.edit-select:focus {
  outline: none;
  border-color: #409eff;
}

/* Toast 提示 */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 4px;
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-size: 0.9rem;
}

.toast-success {
  background: #67c23a;
}

.toast-error {
  background: #f56c6c;
}


.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: #909399;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #f5f7fa;
  color: #606266;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e4e7ed;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-body {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e4e7ed;
  }

  .app-header {
    padding: 16px 20px;
  }

  .app-title {
    font-size: 1.3rem;
  }

  .app-subtitle {
    font-size: 0.8rem;
  }

  .main-content {
    padding: 20px 16px;
  }

  .add-contact-section,
  .contacts-section {
    padding: 16px;
    overflow-x: auto;
  }

  .contacts-table {
    font-size: 0.85rem;
  }

  .contacts-table th,
  .contacts-table td {
    padding: 10px 8px;
  }

  .toast {
    right: 12px;
    left: 12px;
    top: 12px;
  }
}
</style>

