"""
FIX: Pass locale from forms → API → auto-reply
Instead of detecting language from text (unreliable),
we pass the actual site locale that the user is browsing in.

RUN FROM star-food ROOT:
  python fix_locale_autoreply.py
"""

import os

# ============================================================
# 1. ContactForm.tsx — add locale to fetch body
# ============================================================
path = "src/components/ContactForm/ContactForm.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add locale from useLanguage
content = content.replace(
    'const { t } = useLanguage();',
    'const { t, locale } = useLanguage();'
)

# Add locale to fetch body
content = content.replace(
    '''body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),''',
    '''body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
          locale,
        }),'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print(f"✅ {path} — added locale to fetch body")

# ============================================================
# 2. QuoteForm.tsx — add locale to fetch body
# ============================================================
path = "src/components/QuoteForm/QuoteForm.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add locale from useLanguage
content = content.replace(
    'const { t } = useLanguage();',
    'const { t, locale } = useLanguage();'
)

# Add locale to fetch body
content = content.replace(
    'body: JSON.stringify(formData),',
    'body: JSON.stringify({ ...formData, locale }),'
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print(f"✅ {path} — added locale to fetch body")

# ============================================================
# 3. api/contact/route.ts — extract locale, pass to sendAutoReply
# ============================================================
path = "src/app/api/contact/route.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add locale to destructuring
content = content.replace(
    'const { name, email, phone, subject, message } = body;',
    'const { name, email, phone, subject, message, locale } = body;'
)

# Pass locale to sendAutoReply
content = content.replace(
    '''await sendAutoReply({
        type: "contact",
        name,
        email,
        phone,
        subject,
        message,
      });''',
    '''await sendAutoReply({
        type: "contact",
        name,
        email,
        phone,
        subject,
        message,
        locale: locale || "en",
      });'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print(f"✅ {path} — passing locale to sendAutoReply")

# ============================================================
# 4. api/quote/route.ts — extract locale, pass to sendAutoReply
# ============================================================
path = "src/app/api/quote/route.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add locale to destructuring
content = content.replace(
    '''const {
      company,
      name,
      email,
      phone,
      country,
      product,
      quantity,
      deliveryTerms,
      message,
    } = body;''',
    '''const {
      company,
      name,
      email,
      phone,
      country,
      product,
      quantity,
      deliveryTerms,
      message,
      locale,
    } = body;'''
)

# Pass locale to sendAutoReply
content = content.replace(
    '''await sendAutoReply({
        type: "quote",
        name,
        email,
        phone,
        company,
        country,
        product,
        quantity,
        deliveryTerms,
        message,
      });''',
    '''await sendAutoReply({
        type: "quote",
        name,
        email,
        phone,
        company,
        country,
        product,
        quantity,
        deliveryTerms,
        message,
        locale: locale || "en",
      });'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print(f"✅ {path} — passing locale to sendAutoReply")

# ============================================================
# 5. lib/auto-reply.ts — use locale param instead of detectLanguage
# ============================================================
path = "src/lib/auto-reply.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add locale to AutoReplyData interface
content = content.replace(
    '''interface AutoReplyData {
  type: "contact" | "quote";
  name: string;
  email: string;''',
    '''interface AutoReplyData {
  type: "contact" | "quote";
  name: string;
  email: string;
  locale?: string;'''
)

# Replace language detection with locale param usage
content = content.replace(
    '''  const {
    type,
    name,
    email,
    message,
    subject,
    phone,
    company,
    country,
    product,
    quantity,
    deliveryTerms,
  } = data;''',
    '''  const {
    type,
    name,
    email,
    message,
    subject,
    phone,
    company,
    country,
    product,
    quantity,
    deliveryTerms,
    locale,
  } = data;'''
)

# Replace detectLanguage call with locale-first approach
content = content.replace(
    '''  // Detect language
  const textForDetection = message || product || "";
  const lang = detectLanguage(textForDetection);
  const langCfg = LANG_CONFIG[lang] || LANG_CONFIG.en;''',
    '''  // Use locale from form (reliable) or fall back to text detection
  const lang = (locale && LANG_CONFIG[locale]) ? locale : detectLanguage(message || product || "");
  const langCfg = LANG_CONFIG[lang] || LANG_CONFIG.en;'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print(f"✅ {path} — using locale param (fallback to detectLanguage)")

print("\n🎉 Done! All 5 files patched.")
print("Test: submit form from /tr/ page → AI reply should be in Turkish")
print("\nCommit:")
print('git add . && git commit -m "fix: pass locale from forms to AI auto-reply" && git push')
